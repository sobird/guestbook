/**
 * next/image 组件测试
 * 
 * @see https://nextjs.org/docs/pages/api-reference/components/image
 * 
 * sobird<i@sobird.me> at 2023/10/30 15:07:59 created.
 */

import { useState } from "react";
import Image from "next/image";


export default function Profile() {
  const [count, setCount] = useState(0);

  console.log('count', count);

  return (
    <>
      <Image
        src="/images/profile.jpg"
        alt="sobird"
        // layout="fill"
        width="128"
        height="128"
        priority={true}
      />
      <button onClick={() => setCount(count => count + 1)}>按钮 - {count}</button>
    </>
  );
}
