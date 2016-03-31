import React from 'react';

export default ({task}) => <div>{task}</div>;

/*Note: Even though we aren't referring to React directly through code here, it is good to remember
that the JSX will get transformed into calls going through it.
Hence if you remove the import statement, the code will break.
Babel plugin known as babel-plugin-react-require is able to generate the imports for you automatically if you prefer to avoid the imports.
*/
