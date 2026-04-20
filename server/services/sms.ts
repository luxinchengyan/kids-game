/**
 * SMS 服务 — 可插拔: mock(开发) / aliyun / tencent
 * 开发环境下验证码固定为 SMS_MOCK_CODE（默认 "123456"），控制台也会打印
 */
import { serverConfig } from '../config';

function generateOtpCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendAliyun(phone: string, code: string): Promise<void> {
  // 阿里云短信 SDK（动态引入，避免无此包时报错）
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore optional peer dep
    const Core = await import('@alicloud/pop-core');
    const client = new Core.default({
      accessKeyId: serverConfig.sms.aliyunAccessKeyId!,
      accessKeySecret: serverConfig.sms.aliyunAccessKeySecret!,
      endpoint: 'https://dysmsapi.aliyuncs.com',
      apiVersion: '2017-05-25',
    });
    await client.request('SendSms', {
      PhoneNumbers: phone,
      SignName: serverConfig.sms.aliyunSignName,
      TemplateCode: serverConfig.sms.aliyunTemplateCode,
      TemplateParam: JSON.stringify({ code }),
    }, { method: 'POST' });
  } catch (err) {
    throw new Error(`[SMS] 阿里云短信发送失败: \${(err as Error).message}`);
  }
}

async function sendTencent(phone: string, code: string): Promise<void> {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore optional peer dep
    const tencentcloud = await import('tencentcloud-sdk-nodejs');
    const smsClient = tencentcloud.sms.v20210111.Client;
    const client = new smsClient({
      credential: { secretId: serverConfig.sms.tencentSecretId!, secretKey: serverConfig.sms.tencentSecretKey! },
      region: '',
    });
    await client.SendSms({
      SmsSdkAppId: serverConfig.sms.tencentAppId!,
      SignName: serverConfig.sms.tencentSignName,
      TemplateId: serverConfig.sms.tencentTemplateId!,
      TemplateParamSet: [code],
      PhoneNumberSet: [`+86\${phone}`],
    });
  } catch (err) {
    throw new Error(`[SMS] 腾讯云短信发送失败: \${(err as Error).message}`);
  }
}

export async function sendOtp(phone: string): Promise<string> {
  const code = serverConfig.sms.provider === 'mock'
    ? serverConfig.sms.mockCode
    : generateOtpCode();

  if (serverConfig.sms.provider === 'mock') {
    console.log(`[SMS Mock] Phone: \${phone}, OTP: \${code}`);
    return code;
  }

  if (serverConfig.sms.provider === 'aliyun') {
    await sendAliyun(phone, code);
  } else if (serverConfig.sms.provider === 'tencent') {
    await sendTencent(phone, code);
  }

  return code;
}
