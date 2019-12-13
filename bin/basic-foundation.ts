#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { BasicFoundationStack } from '../lib/basic-foundation-stack';

const app = new cdk.App();
new BasicFoundationStack(app, 'BasicFoundationStack');