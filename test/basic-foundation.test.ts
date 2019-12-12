import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import BasicFoundation = require('../lib/basic-foundation-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new BasicFoundation.BasicFoundationStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});