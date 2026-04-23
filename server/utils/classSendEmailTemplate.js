// const classSendEmailTemplate = ({  title, description, date, classLink }) => {
//     return `
// <div style="font-family: Arial, sans-serif; line-height: 1.5;">
//     <h2 style="color: #333;">Dear Student</h2>
//     <p>We are excited to announce a new class in your course:</p>
//     <div style="border: 1px solid #ddd; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
//         <h3 style="margin-top: 0;">${title}</h3>
//         <p>${description}</p>
//         <p><strong>Date:</strong> ${new Date(date).toLocaleString()}</p>
//         <p><strong>Class Link:</strong> <a href="${classLink}" target="_blank">${classLink}</a></p>
//     </div>
//     <p>Don't forget to mark your calendar and join the class on time!</p>
//     <br/>
//     <p>Best regards,</p>
//     <p>The Online Learning ACaDemy Team</p>
// </div>
//     `;
// };

// export default classSendEmailTemplate;




const classSendEmailTemplate = ({ title, description, date, classLink }) => {
  return `
  <div style="margin:0; padding:0; background-color:#f4f7fb; font-family:Arial, Helvetica, sans-serif;">
    <div style="max-width:650px; margin:30px auto; background:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,0.08); border:1px solid #e5e7eb;">
      
      <!-- Header -->
      <div style="background:linear-gradient(135deg, #2563eb, #1d4ed8); padding:30px 25px; text-align:center;">
        <h1 style="margin:0; color:#ffffff; font-size:28px; font-weight:700;">
          New Class Announcement
        </h1>
        <p style="margin:10px 0 0; color:#dbeafe; font-size:15px;">
          Online Learning Academy
        </p>
      </div>

      <!-- Body -->
      <div style="padding:30px 25px; color:#374151;">
        <h2 style="margin-top:0; font-size:22px; color:#111827;">
          Dear Student,
        </h2>

        <p style="font-size:15px; line-height:1.8; margin-bottom:20px;">
          We are excited to inform you that a new class has been scheduled for your course. Please find the details below:
        </p>

        <!-- Class Card -->
        <div style="background:#f9fafb; border:1px solid #e5e7eb; border-left:5px solid #2563eb; border-radius:12px; padding:22px; margin-bottom:25px;">
          <h3 style="margin:0 0 12px; font-size:22px; color:#1d4ed8;">
            ${title}
          </h3>

          <p style="margin:0 0 16px; font-size:15px; line-height:1.8; color:#4b5563;">
            ${description}
          </p>

          <p style="margin:8px 0; font-size:15px;">
            <strong style="color:#111827;">Date & Time:</strong> 
            <span style="color:#374151;">${new Date(date).toLocaleString()}</span>
          </p>

          <p style="margin:16px 0 0;">
            <a href="${classLink}" target="_blank" 
              style="display:inline-block; background:#2563eb; color:#ffffff; text-decoration:none; padding:12px 22px; border-radius:8px; font-size:15px; font-weight:600;">
              Join Class
            </a>
          </p>

          <p style="margin:14px 0 0; font-size:13px; color:#6b7280; word-break:break-all;">
            If the button does not work, use this link: <br/>
            <a href="${classLink}" target="_blank" style="color:#2563eb; text-decoration:none;">
              ${classLink}
            </a>
          </p>

          
        </div>

        <p style="font-size:15px; line-height:1.8; margin-bottom:0;">
          Please mark your calendar and make sure to join the class on time. We look forward to seeing you there.
        </p>

        <p style="margin-top:28px; font-size:15px; line-height:1.8;">
          Best regards, <br/>
          <strong style="color:#111827;">The Online Learning & ASSIGNMENT SUBMISSION SYSTEM Team</strong>
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#f9fafb; border-top:1px solid #e5e7eb; padding:18px 25px; text-align:center;">
        <p style="margin:0; font-size:13px; color:#6b7280;">
          This is an automated email from Online Learning & ASSIGNMENT SUBMISSION SYSTEM.
        </p>
      </div>
    </div>
  </div>
  `;
};

export default classSendEmailTemplate;
