import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sibbir Vai LMS API Documentation",
      version: "1.0.0",
      description: "Swagger API documentation for Course, Class, Assignment, Certificate and User system",
    },
    servers: [
      {
        url: "http://127.0.0.1:5000",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string", example: "65f123abc456def789000111" },
            fullname: { type: "string", example: "Student Name" },
            email: { type: "string", example: "student@gmail.com" },
            image: { type: "string", example: "uploads/user.jpg" },
            role: {
              type: "string",
              enum: ["admin", "student", "instruct"],
              example: "student",
            },
            skills: { type: "string", example: "React, Node.js" },
            githubLink: { type: "string", example: "https://github.com/user" },
            linkedInLink: { type: "string", example: "https://linkedin.com/in/user" },
            aboutUs: { type: "string", example: "I am a MERN developer." },
          },
        },

        Course: {
          type: "object",
          properties: {
            _id: { type: "string", example: "65f123abc456def789000222" },
            title: { type: "string", example: "MERN Stack Development" },
            images: { type: "string", example: "uploads/course.jpg" },
            description: { type: "string", example: "Complete MERN Stack course" },
            instructor: { type: "string", example: "65f123abc456def789000111" },
            enrollLastDate: {
              type: "string",
              format: "date-time",
              example: "2026-05-30T00:00:00.000Z",
            },
            skills: { type: "string", example: "MongoDB, Express, React, Node.js" },
            price: { type: "number", example: 5000 },
            rating: { type: "number", example: 4.5 },
            isactive: { type: "boolean", example: true },
            rejectstudents: { type: "boolean", example: false },
          },
        },

        Class: {
          type: "object",
          properties: {
            _id: { type: "string", example: "65f123abc456def789000333" },
            title: { type: "string", example: "Introduction to React" },
            description: { type: "string", example: "Basic React class" },
            resourcesLink: {
              type: "string",
              example: "https://drive.google.com/resource-link",
            },
            classLink: {
              type: "string",
              example: "https://meet.google.com/class-link",
            },
            date: {
              type: "string",
              format: "date-time",
              example: "2026-04-24T10:00:00.000Z",
            },
            course: { type: "string", example: "65f123abc456def789000222" },
          },
        },

        Assignment: {
          type: "object",
          properties: {
            _id: { type: "string", example: "65f123abc456def789000444" },
            title: { type: "string", example: "React Component Assignment" },
            description: { type: "string", example: "Create a reusable React component" },
            fileUrl: { type: "string", example: "uploads/assignment.pdf" },
            submissionDeadline: {
              type: "string",
              format: "date-time",
              example: "2026-05-01T23:59:00.000Z",
            },
            class: { type: "string", example: "65f123abc456def789000333" },
            submissions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  student: { type: "string", example: "65f123abc456def789000111" },
                  fileUrl: { type: "string", example: "uploads/submission.pdf" },
                  submittedAt: {
                    type: "string",
                    format: "date-time",
                  },
                  isLateSubmission: { type: "boolean", example: false },
                  lateSubmissionReason: {
                    type: "string",
                    example: "Internet problem",
                  },
                  mark: { type: "number", example: 8 },
                  review: { type: "string", example: "Good work" },
                },
              },
            },
          },
        },

        Certificate: {
          type: "object",
          properties: {
            _id: { type: "string", example: "65f123abc456def789000555" },
            userId: { type: "string", example: "65f123abc456def789000111" },
            courseId: { type: "string", example: "65f123abc456def789000222" },
            image: { type: "string", example: "uploads/certificate.jpg" },
          },
        },

        MarkInput: {
          type: "object",
          required: ["mark"],
          properties: {
            mark: {
              type: "number",
              example: 8,
            },
          },
        },

        ReviewInput: {
          type: "object",
          required: ["review"],
          properties: {
            review: {
              type: "string",
              example: "Excellent submission. Keep it up.",
            },
          },
        },

        AdditionalMarksInput: {
          type: "object",
          required: ["studentId", "writtenMark", "attendanceMark"],
          properties: {
            studentId: {
              type: "string",
              example: "65f123abc456def789000111",
            },
            writtenMark: {
              type: "number",
              example: 40,
            },
            attendanceMark: {
              type: "number",
              example: 10,
            },
          },
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],

    paths: {
      "/course/courses/{courseId}/students": {
        get: {
          tags: ["Course"],
          summary: "Get course students with classes and assignments",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: "path",
              name: "courseId",
              required: true,
              schema: { type: "string" },
              description: "Course ID",
            },
          ],
          responses: {
            200: {
              description: "Course students fetched successfully",
            },
            401: {
              description: "Unauthorized",
            },
            404: {
              description: "Course not found",
            },
          },
        },
      },

      "/course/{courseId}/{studentId}": {
        get: {
          tags: ["Course"],
          summary: "Get student written and attendance marks",
          parameters: [
            {
              in: "path",
              name: "courseId",
              required: true,
              schema: { type: "string" },
            },
            {
              in: "path",
              name: "studentId",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: {
              description: "Additional marks fetched successfully",
            },
            404: {
              description: "Marks not found",
            },
          },
        },
      },

      "/course/{courseId}": {
        post: {
          tags: ["Course"],
          summary: "Add or update written and attendance marks",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: "path",
              name: "courseId",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AdditionalMarksInput",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Marks updated successfully",
            },
            201: {
              description: "Marks added successfully",
            },
          },
        },
      },

      "/user/{studentId}/{courseId}": {
        get: {
          tags: ["User"],
          summary: "Get student total assignment mark for a course",
          parameters: [
            {
              in: "path",
              name: "studentId",
              required: true,
              schema: { type: "string" },
            },
            {
              in: "path",
              name: "courseId",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: {
              description: "Total mark fetched successfully",
            },
          },
        },
      },

      "/api/assignments/submit-mark/{submissionId}/{studentId}": {
        patch: {
          tags: ["Assignment"],
          summary: "Submit mark for assignment submission",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: "path",
              name: "submissionId",
              required: true,
              schema: { type: "string" },
            },
            {
              in: "path",
              name: "studentId",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MarkInput",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Mark submitted successfully",
            },
            404: {
              description: "Submission not found",
            },
          },
        },
      },

      "/api/assignments/{assignmentId}/submissions/{submissionId}/review": {
        patch: {
          tags: ["Assignment"],
          summary: "Add or update submission review",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: "path",
              name: "assignmentId",
              required: true,
              schema: { type: "string" },
            },
            {
              in: "path",
              name: "submissionId",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ReviewInput",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Review saved successfully",
            },
            404: {
              description: "Assignment or submission not found",
            },
          },
        },
      },
    },
  },

  apis: ["./router/**/*.js", "./routes/**/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;