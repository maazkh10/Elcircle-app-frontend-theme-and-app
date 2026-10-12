import {extension, Text} from '@shopify/ui-extensions/admin';

export default extension(
  'admin.product-details.block.render',
  (root) => {
    root.appendChild(
      root.createComponent(Text, {}, 'HELLO WORLD')
    );
  },
);