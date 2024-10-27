import { useState, useEffect } from "react";
import { db, storage } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export default function ManageDesserts() {
  const [desserts, setDesserts] = useState([]);
  const [newDessert, setNewDessert] = useState("");
  const [sugarContent, setSugarContent] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState(""); // สำหรับเก็บประเภทเมนู
  // สำหรับเก็บประเภทเมนู

  const dessertsRef = collection(db, "desserts");

  const [editing, setEditing] = useState(false);
  const [currentDessert, setCurrentDessert] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(dessertsRef, (snapshot) => {
      const updatedDesserts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDesserts(updatedDesserts);
    });

    return () => unsubscribe();
  }, []);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const uploadImage = async (image) => {
    if (image == null) return null;
    const imageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(imageRef, image);
    return getDownloadURL(imageRef);
  };

  const addDessert = async () => {
    if (!newDessert.trim() || !sugarContent.trim() || !category || uploading)
      return;
    setUploading(true);
    const imageUrl = await uploadImage(image);
    await addDoc(dessertsRef, {
      name: newDessert,
      sugarContent: sugarContent,
      category: category, // บันทึกประเภทเมนูลง Firebase
      imageUrl,
    });
    setUploading(false);
    setNewDessert("");
    setSugarContent("");
    setCategory(""); // รีเซ็ต category หลังจากเพิ่มข้อมูล
    setImage(null);
  };

  const deleteImage = async (imageUrl) => {
    const imageRef = ref(storage, imageUrl);
    try {
      await deleteObject(imageRef);
      console.log("Image deleted successfully");
    } catch (error) {
      console.error("Error removing image: ", error);
    }
  };
  const startEdit = (dessert) => {
    setEditing(true);
    setCurrentDessert({ ...dessert });
    setImage(null); // ตั้งค่ารูปภาพใหม่เป็น null หากต้องการเปลี่ยนรูป
    //show top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const updateDessert = async (id) => {
    const dessertDocRef = doc(db, "desserts", id);
    const updatedData = {
      name: currentDessert.name,
      sugarContent: currentDessert.sugarContent,
    };

    if (image) {
      const imageUrl = await uploadImage(image);
      updatedData.imageUrl = imageUrl;
    }

    await updateDoc(dessertDocRef, updatedData);
    setEditing(false);
  };

  const deleteDessert = async (id) => {
    const dessertDocRef = doc(db, "desserts", id);
    try {
      const docSnap = await getDoc(dessertDocRef);
      if (docSnap.exists()) {
        const { imageUrl } = docSnap.data();
        if (imageUrl) {
          await deleteImage(imageUrl); // ใช้ฟังก์ชัน deleteImage ที่สร้างข้างต้น
        }
        await deleteDoc(dessertDocRef);
        console.log("Document and image deleted with ID:", id);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error deleting document and/or image: ", error);
    }
  };
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Desserts</h1>
      {editing ? (
        <div className="mb-4">
          <input
            type="text"
            value={currentDessert.name}
            onChange={(e) =>
              setCurrentDessert({ ...currentDessert, name: e.target.value })
            }
            placeholder="Edit dessert name"
            className="input input-bordered w-full mb-2"
          />
          <input
            type="text"
            value={currentDessert.sugarContent}
            onChange={(e) =>
              setCurrentDessert({
                ...currentDessert,
                sugarContent: e.target.value,
              })
            }
            placeholder="Edit sugar content (%)"
            className="input input-bordered w-full mb-2"
          />
          <input
            type="file"
            onChange={onFileChange}
            className="input input-bordered w-full mb-4"
          />
          <button
            onClick={() => updateDessert(currentDessert.id)}
            className="btn btn-success mr-2"
          >
            Save Changes
          </button>
          <button
            onClick={() => setEditing(false)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              value={newDessert}
              onChange={(e) => setNewDessert(e.target.value)}
              placeholder="Enter dessert name"
              className="input input-bordered w-full col-span-2"
            />
            <input
              type="text"
              value={sugarContent}
              onChange={(e) => setSugarContent(e.target.value)}
              placeholder="Sugar content (%)"
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Select Category</option>
              <option value="ผลไม้">ผลไม้</option>
              <option value="เครื่องดื่ม">เครื่องดื่ม</option>
              <option value="ขนม">ขนม</option>
            </select>
          </div>
          <input
            type="file"
            onChange={onFileChange}
            className="input input-bordered w-full mb-4"
          />
          <button
            onClick={addDessert}
            className="btn btn-primary mb-6"
            disabled={uploading}
          >
            {uploading ? "Adding..." : "Add Dessert"}
          </button>
        </div>
      )}
      <ul>
        {desserts.map((dessert) => (
          <li
            key={dessert.id}
            className="flex flex-col md:flex-row justify-between items-center p-4 bg-base-200 rounded-lg mb-4"
          >
            <div className="flex-1">
              <span className="text-lg text-center font-medium">
                {dessert.name} - Sugar: {dessert.sugarContent}% - Category:{" "}
                {dessert.category}
              </span>
              {dessert.imageUrl && (
                <img
                  src={dessert.imageUrl}
                  alt="Dessert"
                  className="mt-2 rounded-lg" // Adjusted class for image
                  style={{ maxWidth: "100%", height: "auto", width: "400px" }} // Example of direct inline style for larger images
                />
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
              <button
                onClick={() => startEdit(dessert)}
                className="btn btn-info"
              >
                Edit
              </button>
              <button
                onClick={() => deleteDessert(dessert.id)}
                className="btn btn-error"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
