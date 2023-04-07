/*
 * @Author: Sky
 * @Date: 2023-04-07 16:07:18
 * @Description:
 */
import React, { type FC } from 'react';

const Foo: FC<{ title: string }> = (props) => <h4>{props.title}信息</h4>;

export default Foo;
