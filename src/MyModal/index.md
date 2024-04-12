# MyModal

This is an example component.

```jsx
import { MyModal } from "erumeta-webapp-module";
import React, { useState } from "react";
import { Button } from "antd";
const MyModalDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <MyModal open={open} />
    </>
  );
};
export default MyModalDemo;
```
