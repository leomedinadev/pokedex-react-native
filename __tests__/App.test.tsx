/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shipped with jest.
import {expect, it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';

it('muestra el aviso de inicio de sesión en Favoritos al arrancar', async () => {
  let tree: renderer.ReactTestRenderer;
  await act(async () => {
    tree = renderer.create(<App />);
  });

  expect(JSON.stringify(tree!.toJSON())).toContain('Para ver esta pantalla tienes que iniciar sesión');

  await act(async () => {
    tree.unmount();
  });
});
