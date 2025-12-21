// Firebase type shim
//
// This project uses Firebase at runtime, but the full Firebase TypeScript types
// can be extremely heavy for some build pipelines.
// We provide lightweight module declarations to keep typechecking stable.

declare module "firebase/app" {
  export const initializeApp: any;
}

declare module "firebase/firestore" {
  export const getFirestore: any;
  export const collection: any;
  export const addDoc: any;
  export const serverTimestamp: any;
  export const query: any;
  export const onSnapshot: any;
  export const orderBy: any;
}

declare module "firebase/analytics" {
  export const getAnalytics: any;
}
