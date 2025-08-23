import React from 'react';
export default React.forwardRef((props, ref) => <div ref={ref} {...props}>{props.children}</div>);
