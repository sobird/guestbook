/**
 * Google2FA
 *
 * @see https://www.ietf.org/rfc/rfc4226.txt
 * HOTP: An HMAC-Based One-Time Password Algorithm
 *
 * sobird<i@sobird.me> at 2023/11/02 22:40:17 created.
 */
import { createHmac } from 'crypto';

/** Interval between key regeneration */
export const period = 30;
/** Length of One-Time Password */
const digits = 6; //

function str_pad(
  input: string,
  padLength: number,
  padString: string,
  padType: 'STR_PAD_LEFT' | 'STR_PAD_RIGHT' | 'STR_PAD_BOTH'
) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/str_pad/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Michael White (https://getsprink.com)
  //    input by: Marco van Oort
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  //   example 1: str_pad('Kevin van Zonneveld', 30, '-=', 'STR_PAD_LEFT')
  //   returns 1: '-=-=-=-=-=-Kevin van Zonneveld'
  //   example 2: str_pad('Kevin van Zonneveld', 30, '-', 'STR_PAD_BOTH')
  //   returns 2: '------Kevin van Zonneveld-----'
  let half = '';
  let padToGo;
  const _strPadRepeater = function (s, len) {
    let collect = '';
    while (collect.length < len) {
      collect += s;
    }
    collect = collect.substr(0, len);
    return collect;
  };
  input += '';
  padString = padString !== undefined ? padString : ' ';
  if (padType !== 'STR_PAD_LEFT' && padType !== 'STR_PAD_RIGHT' && padType !== 'STR_PAD_BOTH') {
    padType = 'STR_PAD_RIGHT';
  }
  if ((padToGo = padLength - input.length) > 0) {
    if (padType === 'STR_PAD_LEFT') {
      input = _strPadRepeater(padString, padToGo) + input;
    } else if (padType === 'STR_PAD_RIGHT') {
      input = input + _strPadRepeater(padString, padToGo);
    } else if (padType === 'STR_PAD_BOTH') {
      half = _strPadRepeater(padString, Math.ceil(padToGo / 2));
      input = half + input + half;
      input = input.substr(0, padLength);
    }
  }
  return input;
}

function chr(codePt: number) {
  if (codePt > 0xffff) {
    codePt -= 0x10000;
    return String.fromCharCode(0xd800 + (codePt >> 10), 0xdc00 + (codePt & 0x3ff));
  }
  return String.fromCharCode(codePt);
}

function ord(string: string) {
  //  discuss at: https://locutus.io/php/ord/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //    input by: incidence
  //   example 1: ord('K')
  //   returns 1: 75
  //   example 2: ord('\uD800\uDC00'); // surrogate pair to create a single Unicode character
  //   returns 2: 65536
  const str = string + '';
  const code = str.charCodeAt(0);
  if (code >= 0xd800 && code <= 0xdbff) {
    // High surrogate (could change last hex to 0xDB7F to treat
    // high private surrogates as single characters)
    const hi = code;
    if (str.length === 1) {
      // This is just a high surrogate with no following low surrogate,
      // so we return its value;
      return code;
      // we could also throw an error as it is not a complete character,
      // but someone may want to know
    }
    const low = str.charCodeAt(1);
    return (hi - 0xd800) * 0x400 + (low - 0xdc00) + 0x10000;
  }
  if (code >= 0xdc00 && code <= 0xdfff) {
    // Low surrogate
    // This is just a low surrogate with no preceding high surrogate,
    // so we return its value;
    return code;
    // we could also throw an error as it is not a complete character,
    // but someone may want to know
  }
  return code;
}

function pack(format: string) {
  //  discuss at: https://locutus.io/php/pack/
  // original by: Tim de Koning (https://www.kingsquare.nl)
  //    parts by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
  // bugfixed by: Tim de Koning (https://www.kingsquare.nl)
  //      note 1: Float encoding by: Jonas Raoni Soares Silva
  //      note 1: Home: https://www.kingsquare.nl/blog/12-12-2009/13507444
  //      note 1: Feedback: phpjs-pack@kingsquare.nl
  //      note 1: "machine dependent byte order and size" aren't
  //      note 1: applicable for JavaScript; pack works as on a 32bit,
  //      note 1: little endian machine.
  //   example 1: pack('nvc*', 0x1234, 0x5678, 65, 66)
  //   returns 1: '\u00124xVAB'
  //   example 2: pack('H4', '2345')
  //   returns 2: '#E'
  //   example 3: pack('H*', 'D5')
  //   returns 3: 'Õ'
  //   example 4: pack('d', -100.876)
  //   returns 4: "\u0000\u0000\u0000\u0000\u00008YÀ"
  //        test: skip-1
  let formatPointer = 0;
  let argumentPointer = 1;
  let result = '';
  let argument = '';
  let i = 0;
  let r = [];
  let instruction, quantifier, word, precisionBits, exponentBits, extraNullCount;
  // vars used by float encoding
  let bias;
  let minExp;
  let maxExp;
  let minUnnormExp;
  let status;
  let exp;
  let len;
  let bin;
  let signal;
  let n;
  let intPart;
  let floatPart;
  let lastBit;
  let rounded;
  let j;
  let k;
  let tmpResult;
  while (formatPointer < format.length) {
    instruction = format.charAt(formatPointer);
    quantifier = '';
    formatPointer++;
    while (formatPointer < format.length && format.charAt(formatPointer).match(/[\d*]/) !== null) {
      quantifier += format.charAt(formatPointer);
      formatPointer++;
    }
    if (quantifier === '') {
      quantifier = '1';
    }
    // Now pack variables: 'quantifier' times 'instruction'
    switch (instruction) {
      case 'a':
      case 'A':
        // NUL-padded string
        // SPACE-padded string
        if (typeof arguments[argumentPointer] === 'undefined') {
          throw new Error('Warning:  pack() Type ' + instruction + ': not enough arguments');
        } else {
          argument = String(arguments[argumentPointer]);
        }
        if (quantifier === '*') {
          quantifier = argument.length;
        }
        for (i = 0; i < quantifier; i++) {
          if (typeof argument[i] === 'undefined') {
            if (instruction === 'a') {
              result += String.fromCharCode(0);
            } else {
              result += ' ';
            }
          } else {
            result += argument[i];
          }
        }
        argumentPointer++;
        break;
      case 'h':
      case 'H':
        // Hex string, low nibble first
        // Hex string, high nibble first
        if (typeof arguments[argumentPointer] === 'undefined') {
          throw new Error('Warning: pack() Type ' + instruction + ': not enough arguments');
        } else {
          argument = arguments[argumentPointer];
        }
        if (quantifier === '*') {
          quantifier = argument.length;
        }
        if (quantifier > argument.length) {
          const msg = 'Warning: pack() Type ' + instruction + ': not enough characters in string';
          throw new Error(msg);
        }
        for (i = 0; i < quantifier; i += 2) {
          // Always get per 2 bytes...
          word = argument[i];
          if (i + 1 >= quantifier || typeof argument[i + 1] === 'undefined') {
            word += '0';
          } else {
            word += argument[i + 1];
          }
          // The fastest way to reverse?
          if (instruction === 'h') {
            word = word[1] + word[0];
          }
          result += String.fromCharCode(parseInt(word, 16));
        }
        argumentPointer++;
        break;
      case 'c':
      case 'C':
        // signed char
        // unsigned char
        // c and C is the same in pack
        if (quantifier === '*') {
          quantifier = arguments.length - argumentPointer;
        }
        if (quantifier > arguments.length - argumentPointer) {
          throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments');
        }
        for (i = 0; i < quantifier; i++) {
          result += String.fromCharCode(arguments[argumentPointer]);
          argumentPointer++;
        }
        break;
      case 's':
      case 'S':
      case 'v':
        // signed short (always 16 bit, machine byte order)
        // unsigned short (always 16 bit, machine byte order)
        // s and S is the same in pack
        if (quantifier === '*') {
          quantifier = arguments.length - argumentPointer;
        }
        if (quantifier > arguments.length - argumentPointer) {
          throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments');
        }
        for (i = 0; i < quantifier; i++) {
          result += String.fromCharCode(arguments[argumentPointer] & 0xff);
          result += String.fromCharCode((arguments[argumentPointer] >> 8) & 0xff);
          argumentPointer++;
        }
        break;
      case 'n':
        // unsigned short (always 16 bit, big endian byte order)
        if (quantifier === '*') {
          quantifier = arguments.length - argumentPointer;
        }
        if (quantifier > arguments.length - argumentPointer) {
          throw new Error('Warning: pack() Type ' + instruction + ': too few arguments');
        }
        for (i = 0; i < quantifier; i++) {
          result += String.fromCharCode((arguments[argumentPointer] >> 8) & 0xff);
          result += String.fromCharCode(arguments[argumentPointer] & 0xff);
          argumentPointer++;
        }
        break;
      case 'i':
      case 'I':
      case 'l':
      case 'L':
      case 'V':
        // signed integer (machine dependent size and byte order)
        // unsigned integer (machine dependent size and byte order)
        // signed long (always 32 bit, machine byte order)
        // unsigned long (always 32 bit, machine byte order)
        // unsigned long (always 32 bit, little endian byte order)
        if (quantifier === '*') {
          quantifier = arguments.length - argumentPointer;
        }
        if (quantifier > arguments.length - argumentPointer) {
          throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments');
        }
        for (i = 0; i < quantifier; i++) {
          result += String.fromCharCode(arguments[argumentPointer] & 0xff);
          result += String.fromCharCode((arguments[argumentPointer] >> 8) & 0xff);
          result += String.fromCharCode((arguments[argumentPointer] >> 16) & 0xff);
          result += String.fromCharCode((arguments[argumentPointer] >> 24) & 0xff);
          argumentPointer++;
        }
        break;
      case 'N':
        // unsigned long (always 32 bit, big endian byte order)
        if (quantifier === '*') {
          quantifier = arguments.length - argumentPointer;
        }
        if (quantifier > arguments.length - argumentPointer) {
          throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments');
        }
        for (i = 0; i < quantifier; i++) {
          result += String.fromCharCode((arguments[argumentPointer] >> 24) & 0xff);
          result += String.fromCharCode((arguments[argumentPointer] >> 16) & 0xff);
          result += String.fromCharCode((arguments[argumentPointer] >> 8) & 0xff);
          result += String.fromCharCode(arguments[argumentPointer] & 0xff);
          argumentPointer++;
        }
        break;
      case 'f':
      case 'd':
        // float (machine dependent size and representation)
        // double (machine dependent size and representation)
        // version based on IEEE754
        precisionBits = 23;
        exponentBits = 8;
        if (instruction === 'd') {
          precisionBits = 52;
          exponentBits = 11;
        }
        if (quantifier === '*') {
          quantifier = arguments.length - argumentPointer;
        }
        if (quantifier > arguments.length - argumentPointer) {
          throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments');
        }
        for (i = 0; i < quantifier; i++) {
          argument = arguments[argumentPointer];
          bias = Math.pow(2, exponentBits - 1) - 1;
          minExp = -bias + 1;
          maxExp = bias;
          minUnnormExp = minExp - precisionBits;
          status = isNaN((n = parseFloat(argument))) || n === -Infinity || n === +Infinity ? n : 0;
          exp = 0;
          len = 2 * bias + 1 + precisionBits + 3;
          bin = new Array(len);
          signal = (n = status !== 0 ? 0 : n) < 0;
          n = Math.abs(n);
          intPart = Math.floor(n);
          floatPart = n - intPart;
          for (k = len; k; ) {
            bin[--k] = 0;
          }
          for (k = bias + 2; intPart && k; ) {
            bin[--k] = intPart % 2;
            intPart = Math.floor(intPart / 2);
          }
          for (k = bias + 1; floatPart > 0 && k; --floatPart) {
            bin[++k] = ((floatPart *= 2) >= 1) - 0;
          }
          for (k = -1; ++k < len && !bin[k]; ) {}
          // @todo: Make this more readable:
          const key =
            (lastBit =
              precisionBits -
              1 +
              (k = (exp = bias + 1 - k) >= minExp && exp <= maxExp ? k + 1 : bias + 1 - (exp = minExp - 1))) + 1;
          if (bin[key]) {
            if (!(rounded = bin[lastBit])) {
              for (j = lastBit + 2; !rounded && j < len; rounded = bin[j++]) {}
            }
            for (j = lastBit + 1; rounded && --j >= 0; (bin[j] = !bin[j] - 0) && (rounded = 0)) {}
          }
          for (k = k - 2 < 0 ? -1 : k - 3; ++k < len && !bin[k]; ) {}
          if ((exp = bias + 1 - k) >= minExp && exp <= maxExp) {
            ++k;
          } else {
            if (exp < minExp) {
              if (exp !== bias + 1 - len && exp < minUnnormExp) {
                // "encodeFloat::float underflow"
              }
              k = bias + 1 - (exp = minExp - 1);
            }
          }
          if (intPart || status !== 0) {
            exp = maxExp + 1;
            k = bias + 2;
            if (status === -Infinity) {
              signal = 1;
            } else if (isNaN(status)) {
              bin[k] = 1;
            }
          }
          n = Math.abs(exp + bias);
          tmpResult = '';
          for (j = exponentBits + 1; --j; ) {
            tmpResult = (n % 2) + tmpResult;
            n = n >>= 1;
          }
          n = 0;
          j = 0;
          k = (tmpResult = (signal ? '1' : '0') + tmpResult + bin.slice(k, k + precisionBits).join('')).length;
          r = [];
          for (; k; ) {
            n += (1 << j) * tmpResult.charAt(--k);
            if (j === 7) {
              r[r.length] = String.fromCharCode(n);
              n = 0;
            }
            j = (j + 1) % 8;
          }
          r[r.length] = n ? String.fromCharCode(n) : '';
          result += r.join('');
          argumentPointer++;
        }
        break;
      case 'x':
        // NUL byte
        if (quantifier === '*') {
          throw new Error("Warning: pack(): Type x: '*' ignored");
        }
        for (i = 0; i < quantifier; i++) {
          result += String.fromCharCode(0);
        }
        break;
      case 'X':
        // Back up one byte
        if (quantifier === '*') {
          throw new Error("Warning: pack(): Type X: '*' ignored");
        }
        for (i = 0; i < quantifier; i++) {
          if (result.length === 0) {
            throw new Error('Warning: pack(): Type X:' + ' outside of string');
          } else {
            result = result.substring(0, result.length - 1);
          }
        }
        break;
      case '@':
        // NUL-fill to absolute position
        if (quantifier === '*') {
          throw new Error("Warning: pack(): Type X: '*' ignored");
        }
        if (quantifier > result.length) {
          extraNullCount = quantifier - result.length;
          for (i = 0; i < extraNullCount; i++) {
            result += String.fromCharCode(0);
          }
        }
        if (quantifier < result.length) {
          result = result.substring(0, quantifier);
        }
        break;
      default:
        throw new Error('Warning: pack() Type ' + instruction + ': unknown format code');
    }
  }
  if (argumentPointer < arguments.length) {
    const msg2 = 'Warning: pack(): ' + (arguments.length - argumentPointer) + ' arguments unused';
    throw new Error(msg2);
  }
  return result;
}

/** Lookup needed for Base32 encoding */
const lut = new Map([
  ['A', 0],
  ['B', 1],
  ['C', 2],
  ['D', 3],
  ['E', 4],
  ['F', 5],
  ['G', 6],
  ['H', 7],
  ['I', 8],
  ['J', 9],
  ['K', 10],
  ['L', 11],
  ['M', 12],
  ['N', 13],
  ['O', 14],
  ['P', 15],
  ['Q', 16],
  ['R', 17],
  ['S', 18],
  ['T', 19],
  ['U', 20],
  ['V', 21],
  ['W', 22],
  ['X', 23],
  ['Y', 24],
  ['Z', 25],
  ['2', 26],
  ['3', 27],
  ['4', 28],
  ['5', 29],
  ['6', 30],
  ['7', 31],
]);

/**
 * Generates a 16 digit secret key in base32 format
 * @return string
 **/
function generate_secret_key(length = 16) {
  const b32 = '234567QWERTYUIOPASDFGHJKLZXCVBNM';
  let s = '';

  for (let i = 0; i < length; i++) {
    s += b32[Math.floor(Math.random() * 31)];
  }
  return s;
}

/**
   * Returns the current Unix Timestamp devided by the period
   * period.
   * @return integer
   **/
export function get_timestamp() {
  return Math.floor(+new Date() / 1000 / period);
}

/**
   * Decodes a base32 string into a binary string.
   **/
export function base32_decode(b32: string) {
  b32 = b32.toUpperCase();

  if (!/^[ABCDEFGHIJKLMNOPQRSTUVWXYZ234567]+$/.test(b32)) {
    throw new Error('Invalid characters in the base32 string.');
  }
  const l = b32.length;
  let n = 0;
  let j = 0;
  let binary = '';

  for (let i = 0; i < l; i++) {
    n = n << 5; // Move buffer left by 5 to make room
    n = n + lut.get(b32[i]); // Add value into buffer
    j = j + 5; // Keep track of number of bits in buffer

    if (j >= 8) {
      j = j - 8;
      binary += chr((n & (0xff << j)) >> j);
    }
  }

  return binary;
}

/**
   * Takes the secret key and the timestamp and returns the one time
   * password.
   *
   * @param binary key - Secret key in binary form.
   * @param integer counter - Timestamp as returned by get_timestamp.
   * @return string
   **/
export function oath_hotp(key: string, counter: number) {
  if (key.length < 8) {
    throw new Error('Secret key is too short. Must be at least 16 base 32 characters');
  }

  const bin_counter = pack('N*', 0) + pack('N*', counter);
  const hash = createHmac('sha256', bin_counter).update(key).digest('hex');

  return str_pad(oath_truncate(hash) as unknown as string, digits, '0', 'STR_PAD_LEFT');
}
/**
 * Extracts the OTP from the SHA1 hash.
 * @param binary hash
 * @return integer
 **/
function oath_truncate(hash: string) {
  const offset = hash[19].charCodeAt(0) & 0xf;

  return (
    (((ord(hash[offset + 0]) & 0x7f) << 24) |
      ((ord(hash[offset + 1]) & 0xff) << 16) |
      ((ord(hash[offset + 2]) & 0xff) << 8) |
      (ord(hash[offset + 3]) & 0xff)) %
    Math.pow(10, digits)
  );
}

/**
 * Verifys a user inputted key against the current timestamp. Checks $window
 * keys either side of the timestamp.
 *
 * @param string b32seed
 * @param string key - User specified key
 * @param integer $window
 * @param boolean $useTimeStamp
 * @return boolean
 **/
export function verify_key(b32seed, key, $window = 4, $useTimeStamp = true) {
  let timeStamp = get_timestamp();

  if ($useTimeStamp !== true) {
    timeStamp = Number($useTimeStamp);
  }

  const binarySeed = base32_decode(b32seed);

  for (let $ts = timeStamp - $window; $ts <= timeStamp + $window; $ts++) {
    if (oath_hotp(binarySeed, $ts) == key) {
      return true;
    }
  }

  return false;
}

export const generate = (key: string) => {
  const secretkey = base32_decode(key);
  const timestamp = get_timestamp();
  return oath_hotp(secretkey, timestamp);
}

export const verify = (key: string, otp: string) => {
  return verify_key(key, otp);
}