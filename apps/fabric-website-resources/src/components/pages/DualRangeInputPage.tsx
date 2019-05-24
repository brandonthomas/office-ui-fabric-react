import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { DualRangeInputPageProps } from 'office-ui-fabric-react/lib/components/DualRangeInput/DualRangeInput.doc';

export const DualRangeInputPage = (props: { isHeaderVisible: boolean }) => <DemoPage {...{ ...DualRangeInputPageProps, ...props }} />;
