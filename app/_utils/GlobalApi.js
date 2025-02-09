import { gql,request } from "graphql-request";
const MASTER_URL =" https://ap-south-1.cdn.hygraph.com/content/"+process.env.NEXT_PUBLIC_HYGRAPH_API_KEY+"/master"

export const getAllCourseList = async () => {
    try {
        const query = gql`
            query Courses {
                courseLists(first: 20, orderBy: createdAt_DESC) {
                    author
                    name
                    id
                    free
                    description
                    demoUrl
                    banner {
                        url
                    }
                    chapter {
                        ... on Chapter {
                            id
                            name
                            video {
                                url
                            }
                        }
                    }
                    totalChapters
                    sourceCode
                    tag
                    slug
                }
            }
        `;

        const result = await request(MASTER_URL, query);
        return result;
    } catch (error) {
        console.error("Error fetching course list:", error);
        throw error;
    }
};


const getSideBanner =async()=>{
    const query = gql`
    query GetSideBanner {
  sideBanners {
    id
    name
    banner {
      id
      url
    }
    url
  }
}`

const result = await request(MASTER_URL, query);
        return result;
};


const getCourseById = async(courseId) => {
    const query = gql`
    query MyQuery {
  courseList(where: {slug: "`+courseId+`"}) {
    author
    banner {
      url
    }
    chapter {
      ... on Chapter {
        id
        name
        video {
          url
        }
      }
    }
    demoUrl
    description
    free
    id
    name
    slug
    sourceCode
    tag
    totalChapters
  }
}`;
    const result = await request(MASTER_URL, query);
    return result;
}

const enrollToCourse = async (courseId,email,) => {
  const query = gql`
  mutation MyMutation {
  createUserEnrollCourse(
    data: {courseId: "`+courseId+`", userEmail: "`+email+`", courseList: {connect: {slug: "`+courseId+`"}}}
  ) {
    id
  }
    publishManyUserEnrollCoursesConnection {
    edges {
      node {
        id
      }
    }
  }
}
  `;
  const result = await request(MASTER_URL, query);
    return result;
}


const checkUserEnrolledToCourse=async(courseId,email)=>{
  const query = gql`
  query MyQuery {
  userEnrollCourses(where: {courseId: "`+courseId+`", userEmail: "`+email+`"}) {
    id
  }
}`;
const result = await request(MASTER_URL, query);
  return result;
}

const getUserEnrolledCourseDetails=async(id,email)=>{
  const query = gql`
  query MyQuery {
  userEnrollCourses(where: {id: "`+id+`", userEmail: "`+email+`"}) {
    courseId
    id
    userEmail
    completedChapter {
      ... on CompletedChapter {
        id
        chapterId
      }
    }
    courseList {
      author
      banner {
        url
      }
      chapter {
        ... on Chapter {
          id
          name
          shorDesc
          video {
            url
          }
        }
      }
      demoUrl
      description
      free
      id
      name
      slug
      sourceCode
      totalChapters
    }
  }
}`;
const result = await request(MASTER_URL, query);
  return result;
}


const markChapterCompleted = async (enrollId, chapterId) => {

  const query = gql`
    mutation MyMutation {
      updateUserEnrollCourse(
        data: { completedChapter: { create: { CompletedChapter: { data: { chapterId: "`+chapterId+`" } } } } }
        where: { id: "`+enrollId+`" }
      ) {
        id
      }
      publishUserEnrollCourse(where: { id: "`+enrollId+`" }) {
        id
      }
    }
  `;

  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("GraphQL Error:", error);
    return { error: "Failed to mark chapter as completed." };
  }
};

const getUserAllEnrolledCourseList= async(email)=>{
  const query = gql`
  query MyQuery {
  userEnrollCourses(where: {userEmail: "`+email+`"}) {
    completedChapter {
      ... on CompletedChapter {
        id
        chapterId
      }
    }
    courseId
    courseList {
      id
      name
      totalChapters
      slug
      sourceCode
      free
      description
      demoUrl
      chapter {
        ... on Chapter {
          id
          name
        }
      }
      author
      banner {
        url
      }
    }
  }
}`;
const result = await request(MASTER_URL, query);
  return result;
}

const addNewMember=async(email,paymentId)=>{
  const query =gql`
  mutation MyMutation {
  createMembership(data: {active: true, email: "`+email+`", paymentId: "`+paymentId+`"}) {
    id
  }
    publishManyMemberships(to: PUBLISHED) {
    count
  }
}`;
const result = await request(MASTER_URL, query);
  return result;
}

const checkForMembership=async(email)=>{
  const query=gql`
  query MyQuery {
  memberships(where: {email: "`+email+`"}) {
    email
    id
    paymentId
    createdAt
  }
}`;
const result = await request(MASTER_URL, query);
  return result;
}

export default {getAllCourseList, 
  getSideBanner,
  getCourseById,
  enrollToCourse,
  checkUserEnrolledToCourse,
  getUserEnrolledCourseDetails,
  markChapterCompleted,
  getUserAllEnrolledCourseList,
  addNewMember,
  checkForMembership
}