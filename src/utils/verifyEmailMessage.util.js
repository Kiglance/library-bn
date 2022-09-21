import 'dotenv/config';

export default function verifyEmailMessage(token) {
  return `
  <div style="width: 100%; display: flex; align-items: center; justify-content: center; height: 100%;">
  <div
  style="
    max-width: 600px;
    width: 100%;
    padding: 30px 10px;
  "
>
  <h3
    style="
      margin: 40px auto;
      text-align: center;
      font-weight: bold;
      font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
        'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
      color: #333333;
    "
  >
    Thank you for registering into Library app. Click the link below to verify
    and activate your account.
  </h3>
  <div
    style="
      font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
        'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
      background-color: #00b123;
      color: #333333;
      border-radius: 15px;
      border: #797979 1px solid;
      padding: 10px 15px;
      margin: 0px auto;
      max-width: 150px;
      width: 100%;
    "
  >
    <a
      href="${process.env.BASE_URL}/api/v1/users/verify-email/${token}"
      target="_blank"
      rel="noopener noreferrer"
      style="color: #333333 !important; text-decoration: none; margin: 0px auto;text-align: center;width: 100%;"
      >Click Here</a>
  </div>
</div>
</div>
`;
}
