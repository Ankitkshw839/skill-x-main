// Course Enrollment Module
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";
import { auth } from './auth.js';

const database = getDatabase();

// Function to enroll in a course
export async function enrollInCourse(courseId, courseData) {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error('User must be logged in to enroll');
        }

        const enrollmentData = {
            userId: user.uid,
            courseId: courseId,
            enrollmentDate: new Date().toISOString(),
            progress: 0,
            status: 'enrolled',
            ...courseData
        };

        // Add to user's enrollments
        await set(ref(database, `enrollments/${user.uid}/${courseId}`), enrollmentData);

        // Update course enrollment count
        const courseRef = ref(database, `courses/${courseId}/enrollmentCount`);
        const snapshot = await get(courseRef);
        const currentCount = snapshot.exists() ? snapshot.val() : 0;
        await set(courseRef, currentCount + 1);

        return enrollmentData;
    } catch (error) {
        console.error("Error enrolling in course:", error);
        throw error;
    }
}

// Function to get user's enrolled courses
export async function getEnrolledCourses() {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error('User must be logged in to get enrolled courses');
        }

        const enrollmentsRef = ref(database, `enrollments/${user.uid}`);
        const snapshot = await get(enrollmentsRef);

        if (!snapshot.exists()) {
            return [];
        }

        const enrollments = snapshot.val();
        return Object.values(enrollments);
    } catch (error) {
        console.error("Error getting enrolled courses:", error);
        throw error;
    }
}

// Function to update course progress
export async function updateCourseProgress(courseId, progress) {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error('User must be logged in to update progress');
        }

        await set(ref(database, `enrollments/${user.uid}/${courseId}/progress`), progress);
        return progress;
    } catch (error) {
        console.error("Error updating course progress:", error);
        throw error;
    }
}
