// import swaggerJsdoc from "swagger-jsdoc";

// const swaggerOptions = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Sibbir Vai LMS API Documentation",
//       version: "1.0.0",
//       description: "Swagger API documentation for Course, Class, Assignment, Certificate and User system",
//     },
//     servers: [
//       {
//         url: "https://final-yearproject-8pi5.vercel.app",
//         description: "Local server",
//       },
//     ],
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: "http",
//           scheme: "bearer",
//           bearerFormat: "JWT",
//         },
//       },

//       schemas: {
//         User: {
//           type: "object",
//           properties: {
//             _id: { type: "string", example: "65f123abc456def789000111" },
//             fullname: { type: "string", example: "Student Name" },
//             email: { type: "string", example: "student@gmail.com" },
//             image: { type: "string", example: "uploads/user.jpg" },
//             role: {
//               type: "string",
//               enum: ["admin", "student", "instruct"],
//               example: "student",
//             },
//             skills: { type: "string", example: "React, Node.js" },
//             githubLink: { type: "string", example: "https://github.com/user" },
//             linkedInLink: { type: "string", example: "https://linkedin.com/in/user" },
//             aboutUs: { type: "string", example: "I am a MERN developer." },
//           },
//         },

//         Course: {
//           type: "object",
//           properties: {
//             _id: { type: "string", example: "65f123abc456def789000222" },
//             title: { type: "string", example: "MERN Stack Development" },
//             images: { type: "string", example: "uploads/course.jpg" },
//             description: { type: "string", example: "Complete MERN Stack course" },
//             instructor: { type: "string", example: "65f123abc456def789000111" },
//             enrollLastDate: {
//               type: "string",
//               format: "date-time",
//               example: "2026-05-30T00:00:00.000Z",
//             },
//             skills: { type: "string", example: "MongoDB, Express, React, Node.js" },
//             price: { type: "number", example: 5000 },
//             rating: { type: "number", example: 4.5 },
//             isactive: { type: "boolean", example: true },
//             rejectstudents: { type: "boolean", example: false },
//           },
//         },

//         Class: {
//           type: "object",
//           properties: {
//             _id: { type: "string", example: "65f123abc456def789000333" },
//             title: { type: "string", example: "Introduction to React" },
//             description: { type: "string", example: "Basic React class" },
//             resourcesLink: {
//               type: "string",
//               example: "https://drive.google.com/resource-link",
//             },
//             classLink: {
//               type: "string",
//               example: "https://meet.google.com/class-link",
//             },
//             date: {
//               type: "string",
//               format: "date-time",
//               example: "2026-04-24T10:00:00.000Z",
//             },
//             course: { type: "string", example: "65f123abc456def789000222" },
//           },
//         },

//         Assignment: {
//           type: "object",
//           properties: {
//             _id: { type: "string", example: "65f123abc456def789000444" },
//             title: { type: "string", example: "React Component Assignment" },
//             description: { type: "string", example: "Create a reusable React component" },
//             fileUrl: { type: "string", example: "uploads/assignment.pdf" },
//             submissionDeadline: {
//               type: "string",
//               format: "date-time",
//               example: "2026-05-01T23:59:00.000Z",
//             },
//             class: { type: "string", example: "65f123abc456def789000333" },
//             submissions: {
//               type: "array",
//               items: {
//                 type: "object",
//                 properties: {
//                   student: { type: "string", example: "65f123abc456def789000111" },
//                   fileUrl: { type: "string", example: "uploads/submission.pdf" },
//                   submittedAt: {
//                     type: "string",
//                     format: "date-time",
//                   },
//                   isLateSubmission: { type: "boolean", example: false },
//                   lateSubmissionReason: {
//                     type: "string",
//                     example: "Internet problem",
//                   },
//                   mark: { type: "number", example: 8 },
//                   review: { type: "string", example: "Good work" },
//                 },
//               },
//             },
//           },
//         },

//         Certificate: {
//           type: "object",
//           properties: {
//             _id: { type: "string", example: "65f123abc456def789000555" },
//             userId: { type: "string", example: "65f123abc456def789000111" },
//             courseId: { type: "string", example: "65f123abc456def789000222" },
//             image: { type: "string", example: "uploads/certificate.jpg" },
//           },
//         },

//         MarkInput: {
//           type: "object",
//           required: ["mark"],
//           properties: {
//             mark: {
//               type: "number",
//               example: 8,
//             },
//           },
//         },

//         ReviewInput: {
//           type: "object",
//           required: ["review"],
//           properties: {
//             review: {
//               type: "string",
//               example: "Excellent submission. Keep it up.",
//             },
//           },
//         },

//         AdditionalMarksInput: {
//           type: "object",
//           required: ["studentId", "writtenMark", "attendanceMark"],
//           properties: {
//             studentId: {
//               type: "string",
//               example: "65f123abc456def789000111",
//             },
//             writtenMark: {
//               type: "number",
//               example: 40,
//             },
//             attendanceMark: {
//               type: "number",
//               example: 10,
//             },
//           },
//         },
//       },
//     },

//     security: [
//       {
//         bearerAuth: [],
//       },
//     ],

//     paths: {
//       "/course/courses/{courseId}/students": {
//         get: {
//           tags: ["Course"],
//           summary: "Get course students with classes and assignments",
//           security: [{ bearerAuth: [] }],
//           parameters: [
//             {
//               in: "path",
//               name: "courseId",
//               required: true,
//               schema: { type: "string" },
//               description: "Course ID",
//             },
//           ],
//           responses: {
//             200: {
//               description: "Course students fetched successfully",
//             },
//             401: {
//               description: "Unauthorized",
//             },
//             404: {
//               description: "Course not found",
//             },
//           },
//         },
//       },

//       "/course/{courseId}/{studentId}": {
//         get: {
//           tags: ["Course"],
//           summary: "Get student written and attendance marks",
//           parameters: [
//             {
//               in: "path",
//               name: "courseId",
//               required: true,
//               schema: { type: "string" },
//             },
//             {
//               in: "path",
//               name: "studentId",
//               required: true,
//               schema: { type: "string" },
//             },
//           ],
//           responses: {
//             200: {
//               description: "Additional marks fetched successfully",
//             },
//             404: {
//               description: "Marks not found",
//             },
//           },
//         },
//       },

//       "/course/{courseId}": {
//         post: {
//           tags: ["Course"],
//           summary: "Add or update written and attendance marks",
//           security: [{ bearerAuth: [] }],
//           parameters: [
//             {
//               in: "path",
//               name: "courseId",
//               required: true,
//               schema: { type: "string" },
//             },
//           ],
//           requestBody: {
//             required: true,
//             content: {
//               "application/json": {
//                 schema: {
//                   $ref: "#/components/schemas/AdditionalMarksInput",
//                 },
//               },
//             },
//           },
//           responses: {
//             200: {
//               description: "Marks updated successfully",
//             },
//             201: {
//               description: "Marks added successfully",
//             },
//           },
//         },
//       },

//       "/user/{studentId}/{courseId}": {
//         get: {
//           tags: ["User"],
//           summary: "Get student total assignment mark for a course",
//           parameters: [
//             {
//               in: "path",
//               name: "studentId",
//               required: true,
//               schema: { type: "string" },
//             },
//             {
//               in: "path",
//               name: "courseId",
//               required: true,
//               schema: { type: "string" },
//             },
//           ],
//           responses: {
//             200: {
//               description: "Total mark fetched successfully",
//             },
//           },
//         },
//       },

//       "/api/assignments/submit-mark/{submissionId}/{studentId}": {
//         patch: {
//           tags: ["Assignment"],
//           summary: "Submit mark for assignment submission",
//           security: [{ bearerAuth: [] }],
//           parameters: [
//             {
//               in: "path",
//               name: "submissionId",
//               required: true,
//               schema: { type: "string" },
//             },
//             {
//               in: "path",
//               name: "studentId",
//               required: true,
//               schema: { type: "string" },
//             },
//           ],
//           requestBody: {
//             required: true,
//             content: {
//               "application/json": {
//                 schema: {
//                   $ref: "#/components/schemas/MarkInput",
//                 },
//               },
//             },
//           },
//           responses: {
//             200: {
//               description: "Mark submitted successfully",
//             },
//             404: {
//               description: "Submission not found",
//             },
//           },
//         },
//       },

//       "/api/assignments/{assignmentId}/submissions/{submissionId}/review": {
//         patch: {
//           tags: ["Assignment"],
//           summary: "Add or update submission review",
//           security: [{ bearerAuth: [] }],
//           parameters: [
//             {
//               in: "path",
//               name: "assignmentId",
//               required: true,
//               schema: { type: "string" },
//             },
//             {
//               in: "path",
//               name: "submissionId",
//               required: true,
//               schema: { type: "string" },
//             },
//           ],
//           requestBody: {
//             required: true,
//             content: {
//               "application/json": {
//                 schema: {
//                   $ref: "#/components/schemas/ReviewInput",
//                 },
//               },
//             },
//           },
//           responses: {
//             200: {
//               description: "Review saved successfully",
//             },
//             404: {
//               description: "Assignment or submission not found",
//             },
//           },
//         },
//       },
//     },
//   },

//   apis: ["./router/**/*.js", "./routes/**/*.js"],
// };

// const swaggerSpec = swaggerJsdoc(swaggerOptions);

// export default swaggerSpec;








import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Online Learning & Assignment Submission System API Documentation",
      version: "1.0.0",
      description:
        "Swagger API documentation for User, Course, Class, Assignment and Certificate routes",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server",
      },
      {
        url: "https://final-yearproject-8pi5.vercel.app",
        description: "Production server",
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
    },
    paths: {
      "/": {
        get: {
          tags: ["Root"],
          summary: "Check API running status",
          responses: {
            200: { description: "Hello World response" },
          },
        },
      },

      // ================= USER ROUTES =================

      "/user/signup": {
        post: {
          tags: ["User"],
          summary: "Register new user",
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  required: ["fullname", "email", "password", "image"],
                  properties: {
                    fullname: { type: "string", example: "John Doe" },
                    email: { type: "string", example: "john@gmail.com" },
                    password: { type: "string", example: "12345678" },
                    image: { type: "string", format: "binary" },
                    role: {
                      type: "string",
                      enum: ["admin", "student", "instruct"],
                      example: "student",
                    },
                    skills: { type: "string", example: "React, Node.js" },
                    githubLink: {
                      type: "string",
                      example: "https://github.com/username",
                    },
                    linkedInLink: {
                      type: "string",
                      example: "https://linkedin.com/in/username",
                    },
                    aboutUs: {
                      type: "string",
                      example: "I am a MERN stack developer.",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "User registered successfully" },
            400: { description: "Bad request" },
          },
        },
      },

      "/user/login": {
        post: {
          tags: ["User"],
          summary: "Login user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    email: { type: "string", example: "john@gmail.com" },
                    password: { type: "string", example: "12345678" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Login successful" },
            401: { description: "Invalid credentials" },
          },
        },
      },

      "/user/logout": {
        post: {
          tags: ["User"],
          summary: "Logout user",
          responses: {
            200: { description: "Logout successful" },
          },
        },
      },

      "/user/me": {
        get: {
          tags: ["User"],
          summary: "Get logged-in user profile",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "User profile fetched successfully" },
            401: { description: "Unauthorized" },
          },
        },
      },

      "/user/ins": {
        get: {
          tags: ["User"],
          summary: "Get all active instructors",
          responses: {
            200: { description: "Instructor list fetched successfully" },
          },
        },
      },

      "/user/instructor/{id}": {
        patch: {
          tags: ["User"],
          summary: "Update instructor profile",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "Instructor user ID",
            },
          ],
          requestBody: {
            required: false,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    skills: { type: "string", example: "React, Express" },
                    githubLink: {
                      type: "string",
                      example: "https://github.com/user",
                    },
                    linkedInLink: {
                      type: "string",
                      example: "https://linkedin.com/in/user",
                    },
                    aboutUs: {
                      type: "string",
                      example: "Experienced MERN instructor.",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Instructor profile updated" },
            401: { description: "Unauthorized" },
          },
        },
      },

      "/user/course": {
        get: {
          tags: ["User"],
          summary: "Get enrolled courses of logged-in student",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "Enrolled courses fetched" },
            401: { description: "Unauthorized" },
          },
        },
        post: {
          tags: ["User"],
          summary: "Instructor protected test route",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "Instructor route access successful" },
          },
        },
      },

      "/user/{studentId}/{courseId}": {
        get: {
          tags: ["User"],
          summary: "Get single user/course related data",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "studentId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
            {
              name: "courseId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Data fetched successfully" },
            404: { description: "Not found" },
          },
        },
      },

      // ================= COURSE ROUTES =================

      "/course/download-pdf/{courseId}": {
        get: {
          tags: ["Course"],
          security: [{ bearerAuth: [] }],
          summary: "Generate and download student PDF",
          parameters: [
            {
              name: "courseId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "PDF generated successfully" },
          },
        },
      },

      "/course/add": {
        post: {
          tags: ["Course"],
          summary: "Add new course",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  required: [
                    "title",
                    "description",
                    "enrollLastDate",
                    "skills",
                    "price",
                  ],
                  properties: {
                    title: { type: "string", example: "MERN Stack Course" },
                    images: { type: "string", format: "binary" },
                    description: {
                      type: "string",
                      example: "Complete MERN stack development course",
                    },
                    enrollLastDate: {
                      type: "string",
                      format: "date",
                      example: "2026-05-30",
                    },
                    skills: {
                      type: "string",
                      example: "MongoDB, Express, React, Node.js",
                    },
                    price: { type: "number", example: 5000 },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "Course created successfully" },
            401: { description: "Unauthorized" },
          },
        },
      },

      "/course/publish/{courseId}": {
        patch: {
          tags: ["Course"],
          summary: "Publish course by admin",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "courseId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Course published" },
            401: { description: "Unauthorized" },
          },
        },
      },

      "/course/unpublish/{courseId}": {
        patch: {
          tags: ["Course"],
          summary: "Unpublish course by admin",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "courseId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Course unpublished" },
            401: { description: "Unauthorized" },
          },
        },
      },

      "/course/pending": {
        get: {
          tags: ["Course"],
          summary: "Get all pending courses",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "Pending courses fetched" },
            401: { description: "Unauthorized" },
          },
        },
      },

      "/course/courses/{courseId}/students": {
        get: {
          tags: ["Course"],
          summary: "Get enrolled students in a course",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "courseId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Students fetched successfully" },
          },
        },
      },

      "/course/courses/{courseId}/enroll": {
        post: {
          tags: ["Course"],
          summary: "Enroll student in course",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "courseId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Student enrolled successfully" },
          },
        },
      },

      "/course": {
        get: {
          tags: ["Course"],
          summary: "Get all active courses",
          responses: {
            200: { description: "Courses fetched successfully" },
          },
        },
      },

      "/course/{courseId}": {
        get: {
          tags: ["Course"],
          summary: "Get course by ID",
          parameters: [
            {
              name: "courseId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Course fetched successfully" },
            404: { description: "Course not found" },
          },
        },
        put: {
          tags: ["Course"],
          summary: "Update course by instructor",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "courseId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: false,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    title: { type: "string", example: "Updated MERN Course" },
                    imagess: { type: "string", format: "binary" },
                    description: {
                      type: "string",
                      example: "Updated course description",
                    },
                    enrollLastDate: {
                      type: "string",
                      format: "date",
                      example: "2026-06-30",
                    },
                    skills: {
                      type: "string",
                      example: "React, Node.js, MongoDB",
                    },
                    price: { type: "number", example: 6000 },
                    rating: { type: "number", example: 4.8 },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Course updated successfully" },
          },
        },
        delete: {
          tags: ["Course"],
          summary: "Delete course by instructor",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "courseId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Course deleted successfully" },
          },
        },
        post: {
          tags: ["Course"],
          summary: "Add or update student written and attendance marks",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "courseId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["studentId"],
                  properties: {
                    studentId: {
                      type: "string",
                      example: "65f123abc456def789000111",
                    },
                    writtenMark: { type: "number", example: 40 },
                    attendanceMark: { type: "number", example: 10 },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Marks updated successfully" },
            201: { description: "Marks added successfully" },
          },
        },
      },

      "/course/courses/{courseId}/statistics": {
        get: {
          tags: ["Course"],
          summary: "Get course statistics",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "courseId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Statistics fetched successfully" },
          },
        },
      },

      "/course/{courseId}/{studentId}": {
        get: {
          tags: ["Course"],
          summary: "Get student mark by course and student ID",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "courseId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
            {
              name: "studentId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Student mark fetched successfully" },
          },
        },
      },

      // ================= CLASS ROUTES =================

      "/api/{courseId}/add-class": {
        post: {
          tags: ["Class"],
          summary: "Add class to course",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "courseId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: { type: "string", example: "Introduction Class" },
                    description: {
                      type: "string",
                      example: "This is the first class",
                    },
                    resourcesLink: {
                      type: "string",
                      example: "https://drive.google.com/file",
                    },
                    classLink: {
                      type: "string",
                      example: "https://meet.google.com/class",
                    },
                    date: {
                      type: "string",
                      format: "date-time",
                      example: "2026-05-01T10:00:00.000Z",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "Class added successfully" },
          },
        },
      },

      "/api/{courseId}/classes": {
        get: {
          tags: ["Class"],
          summary: "Get classes by course ID",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "courseId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Classes fetched successfully" },
          },
        },
      },

      // ================= ASSIGNMENT ROUTES =================

      "/api/{courseId}/add-assignment": {
        post: {
          tags: ["Assignment"],
          summary: "Add assignment to course",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "courseId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      example: "React Assignment",
                    },
                    description: {
                      type: "string",
                      example: "Create a React component",
                    },
                    submissionDeadline: {
                      type: "string",
                      format: "date-time",
                      example: "2026-05-10T23:59:00.000Z",
                    },
                    file: { type: "string", format: "binary" },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "Assignment added successfully" },
          },
        },
      },

      "/api/courses/{courseId}/assignments/{assignmentId}/submit": {
        post: {
          tags: ["Assignment"],
          summary: "Submit assignment",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "courseId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
            {
              name: "assignmentId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  required: ["file"],
                  properties: {
                    file: { type: "string", format: "binary" },
                    lateSubmissionReason: {
                      type: "string",
                      example: "Network issue",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Assignment submitted successfully" },
          },
        },
      },

      "/api/{courseId}/assignments": {
        get: {
          tags: ["Assignment"],
          summary: "Get assignments by course ID",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "courseId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Assignments fetched successfully" },
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
              name: "submissionId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
            {
              name: "studentId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["mark"],
                  properties: {
                    mark: { type: "number", example: 8 },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Mark submitted successfully" },
          },
        },
      },

      "/api/assignments/{assignmentId}/submissions/{submissionId}/review": {
        patch: {
          tags: ["Assignment"],
          summary: "Add or update assignment submission review",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "assignmentId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
            {
              name: "submissionId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["review"],
                  properties: {
                    review: {
                      type: "string",
                      example: "Good work. Improve code formatting.",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Review updated successfully" },
          },
        },
      },

      // ================= CERTIFICATE ROUTES =================

      "/api/certificate": {
        post: {
          tags: ["Certificate"],
          summary: "Create certificate",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  required: ["image"],
                  properties: {
                    userId: {
                      type: "string",
                      example: "65f123abc456def789000111",
                    },
                    courseId: {
                      type: "string",
                      example: "65f123abc456def789000222",
                    },
                    image: { type: "string", format: "binary" },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "Certificate created successfully" },
          },
        },
        get: {
          tags: ["Certificate"],
          summary: "Get all certificates",
          responses: {
            200: { description: "Certificates fetched successfully" },
          },
        },
      },

      "/api/certificate/certificates/{courseId}/{userId}": {
        get: {
          tags: ["Certificate"],
          summary: "Get certificate by course ID and user ID",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "courseId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
            {
              name: "userId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Certificate fetched successfully" },
            404: { description: "Certificate not found" },
          },
        },
      },

      "/api/certificate/{id}": {
        put: {
          tags: ["Certificate"],
          summary: "Update certificate",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: false,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    userId: { type: "string" },
                    courseId: { type: "string" },
                    image: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Certificate updated successfully" },
          },
        },
        delete: {
          tags: ["Certificate"],
          summary: "Delete certificate",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Certificate deleted successfully" },
          },
        },
      },
    },
  },
  apis: ["./router/**/*.js", "./routes/**/*.js", "./model/**/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;

