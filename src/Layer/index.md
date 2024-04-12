# MyModal

This is an example component.

```jsx
import { MyModal } from "erumeta-webapp-module";
import React, { useState } from "react";
import { Button } from "antd";
const Demo = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Button onClick={() => setOpen(true)}>MyModal</Button>
      <MyModal open={open} />
    </div>
  );
};
export default Demo;
```

# MyModalTwo

This is an example component.

```jsx
import { MyModalTwo } from "erumeta-webapp-module";
import React, { useState } from "react";
import { Button } from "antd";
const Demo = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Button onClick={() => setOpen(true)}>MyModalTwo</Button>
      <MyModalTwo open={open} />
    </div>
  );
};
export default Demo;
```
