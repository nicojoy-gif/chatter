
import firebaseApp from '../../Config/firebase';
import { getFirestore, getDocsFromServer, collection } from 'firebase/firestore';

export const getUserArticles = async (uid: any) => {
  const db = getFirestore(firebaseApp);

  const articleSnapshot = await getDocsFromServer(collection(db, 'users', uid, 'article'));
console.log(articleSnapshot)
  const userArticles: any = [];

  articleSnapshot.forEach((doc) => {
     userArticles.push({ id: doc.id, data: doc.data() });
  });

console.log(userArticles)
  return userArticles;
};
