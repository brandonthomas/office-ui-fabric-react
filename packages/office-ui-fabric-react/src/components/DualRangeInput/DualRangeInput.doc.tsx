import * as React from 'react';
import { DualRangeInputExample } from './examples/DualRangeInput.Basic.Example';

import { IDocPageProps } from '../../common/DocPage.types';

const DualRangeInputBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DualRangeInput/examples/DualRangeInput.Basic.Example.tsx') as string;

export const DualRangeInputPageProps: IDocPageProps = {
  title: 'DualRangeInput',
  componentName: 'DualRangeInput',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/DualRangeInput',
  examples: [
    {
      title: 'Default DualRangeInput',
      code: DualRangeInputBasicExampleCode,
      view: <DualRangeInputExample />,
      codepenJS: DualRangeInputBasicExampleCode
    }
  ],
  isHeaderVisible: true,
  isFeedbackVisible: true
};
