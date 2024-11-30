import { useEffect, useState } from "react";

export const UploadFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    if (file.type !== "application/pdf") return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      setResult(await response.json());
    } catch (error) {
      console.error("error uploading file: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(result);
  }, [result]);

  return (
    <div className="">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload CV"}
      </button>
    </div>
  );
};
