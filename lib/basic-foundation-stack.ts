import cdk = require('@aws-cdk/core');
import ec2 = require('@aws-cdk/aws-ec2');
import dotenv = require('dotenv');

import { SubnetType, InstanceType, InstanceClass, InstanceSize, AmazonLinuxImage } from '@aws-cdk/aws-ec2';

export class BasicFoundationStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // The code that defines your stack goes here
    const vpc = new ec2.Vpc(this, 'vpc', {
      cidr: '172.21.0.0/16',
      maxAzs: 1,
      subnetConfiguration: [
        {
          name: 'private-subnet',
          subnetType: ec2.SubnetType.PRIVATE,
          cidrMask: 24,
        },
        {
          name: 'public-subnet',
          subnetType: SubnetType.PUBLIC,
          cidrMask: 24,
        }
      ]
    });

    const publicSecurityGroup = new ec2.SecurityGroup(this, 'public-security-group', {
      vpc: vpc,
      allowAllOutbound: true,
      securityGroupName: 'public-security-group'
    })

    publicSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'Allow SSH');

    const instance = new ec2.Instance(this, 'instance', {
      vpc,
      instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.SMALL),
      machineImage: new AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2
      }),
      keyName: 'kleung-juichi',
      vpcSubnets: {
        subnetGroupName: 'private-subnet', 
      }
    });
    
    const publicInstance = new ec2.Instance(this, 'public-instance', {
      vpc,
      instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.SMALL),
      machineImage: new AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2
      }),
      keyName: 'kleung-juichi',
      vpcSubnets: {
        subnetGroupName: 'public-subnet',
      },
      securityGroup: publicSecurityGroup,
    })

  }
}
