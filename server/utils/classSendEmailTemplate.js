const classSendEmailTemplate = ({  title, description, date, classLink }) => {
    return `
<div style="font-family: Arial, sans-serif; line-height: 1.5;">
    <h2 style="color: #333;">Dear Student</h2>
    <p>We are excited to announce a new class in your course:</p>
    <div style="border: 1px solid #ddd; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
        <h3 style="margin-top: 0;">${title}</h3>
        <p>${description}</p>
        <p><strong>Date:</strong> ${new Date(date).toLocaleString()}</p>
        <p><strong>Class Link:</strong> <a href="${classLink}" target="_blank">${classLink}</a></p>
    </div>
    <p>Don't forget to mark your calendar and join the class on time!</p>
    <br/>
    <p>Best regards,</p>
    <p>The Online Learning ACaDemy Team</p>
</div>
    `;
};

export default classSendEmailTemplate;
