/**
 * 验证码表单输入字段
 * 
 * sobird<i@sobird.me> at 2023/10/29 18:20:51 created.
 */

import React, { useState } from 'react';
import { Grid, Button, TextField, ButtonProps, InputProps } from '@mui/material';
import { useForm } from 'react-hook-form';
import useInterval from '@/hooks/useInterval';
import CommonService from '@/services/common';
import { isEmail, isSmsCode } from '@/lib/validator';
import { message } from "@/components/Message";

export type FieldCaptchaProps =  {
  value?: InputProps['value'];
  onChange?: InputProps['onChange'];

  /** 倒计时的秒数 */
  countDown?: number;
  /** 手机号的 name */
  propName?: string;
  /** 获取验证码的方法 */
  onCaptcha?: (mobile: string) => Promise<void>;
  /** 渲染按钮的文字 */
  buttonTextRender?: (count: number) => React.ReactNode;
  /** 获取验证码按钮的props */
  buttonProps?: ButtonProps;

  /** 内部字段属性 */
  fieldProps?: {
    style?: React.CSSProperties;
    width?: string;
    placeholder?: string;
  }
  form: any;
};

const FieldCaptcha: React.FC<FieldCaptchaProps> = ({
  value,
  onChange,
  countDown,
  propName,
  onCaptcha = async (mobile) => {
    CommonService.sendCaptcha(mobile);
  },
  buttonTextRender = (count) => {
    return count ? `${count} 秒后重新获取` : '获取验证码';
  },
  buttonProps,
  fieldProps,

  form
}) => {
  // const form = useForm();
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>();
  const resumeInterval = useInterval(() => {
    setCount((count) => {
      if (count <= 1) {
        resumeInterval(-1);
      }
      return count - 1;
    });
  })

  const onGetCaptcha = async (mobile: string) => {
    try {
      setLoading(true);
      await onCaptcha(mobile);
      setLoading(false);
      setCount(countDown || 60);
      resumeInterval(1000);
    } catch (error) {
      setLoading(false);
      resumeInterval(-1);
      console.log(error);
    }
  };

  return (
    <Grid item sx={{ width: '400px' }} style={{
      // ...fieldProps?.style,
      display: 'flex',
      alignItems: 'center',
      margin: "0 auto"
    }}>
      <TextField
        size="small"
        variant='outlined'
        label='邮箱验证码'
        style={{
          flex: 1
        }}
        {...form.register('code', {
          validate: async (value) => {
            if(!isSmsCode(value)) {
              return "验证码格式错误"
            }
          }
        })}
      />
      <Button
        size='small'
        variant='outlined'
        disabled={count > 0}
        style={{
          marginLeft: 8
        }}
        // loading={loading}
        {...buttonProps}
        onClick={async () => {
          try {
            if (propName) {
              // await form.validateFields([propName].flat(1) as string[]);
              const email = form.getValues(propName);
              if(!isEmail(email)) {
                message.error("请输入正确的邮箱")
                return;
              }
              await onGetCaptcha(email);
            } else {
              await onGetCaptcha('');
            }
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
          }
        }}
      >
        {buttonTextRender(count)}
      </Button>
    </Grid>
  );
};

export default FieldCaptcha;
