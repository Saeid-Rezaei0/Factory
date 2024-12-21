import React, { useState, useEffect } from "react";
import BreadCrumb from "Common/BreadCrumb";
import axios from "axios";
import { Plus, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// تعریف نوع داده برای هر استان
interface Province {
  id: number;
  name: string;
  status: boolean;
}

const Index: React.FC = () => {
  const [data, setData] = useState<Province[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // مدیریت وضعیت مدال

  const sampleData: Province[] = [
    { id: 1, name: "تهران", status: true },
    { id: 2, name: "اصفهان", status: false },
    { id: 3, name: "شیراز", status: true },
  ];

  useEffect(() => {
    setTimeout(() => {
      setData(sampleData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDelete = async (id: number) => {
    try {
      toast.loading("در حال حذف...");
      await axios.delete(`/api/provinces/${id}`);
      setData((prev) => prev.filter((item) => item.id !== id));
      toast.dismiss(); // حذف لودینگ
      toast.success("استان با موفقیت حذف شد");
    } catch (error) {
      toast.dismiss();
      toast.error("مشکلی در حذف استان پیش آمد");
      console.error("Error deleting province:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (values: { name: string; id: number }) => {
    toast.loading("در حال ارسال...");
    try {
      await axios.post("/api/provinces", values);
      toast.dismiss();
      toast.success("استان مورد نظر ثبت شد");
      setData([...data, { ...values, status: true }]);
      closeModal();
    } catch (error) {
      toast.dismiss();
      toast.error("مشکلی پیش آمد. لطفاً دوباره تلاش کنید.");
      console.error("Error adding province:", error);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("نام استان الزامی است"),
    id: Yup.number()
      .required("آیدی استان الزامی است")
      .positive("آیدی باید عدد مثبت باشد")
      .integer("آیدی باید عدد صحیح باشد"),
  });

  if (loading) {
    return <p className="text-center py-4">در حال بارگذاری...</p>;
  }

  return (
    <React.Fragment>
      <ToastContainer closeButton={false} limit={3} />
      <div className="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
        <BreadCrumb pageTitle="داشبورد" title="ثبت استان" />
        <div className="overflow-x-auto">
          <div className="shrink-0 pb-4 w-full bg-white dark:bg-gray-800">
            <Link
              to="#!"
              onClick={openModal}
              className="text-white mt-3 btn mr-3 bg-custom-500"
            >
              <span className="align-middle rtl">ثبت استان</span>
              <Plus className="inline-block size-4 rtl" />
            </Link>
          </div>
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200">
  <thead className="dark:text-white">
    <tr className="bg-[#F1F5F9] dark:bg-gray-700 text-gray-600 dark:text-white uppercase">
      <th className="py-3 px-6 text-left">نام استان</th>
      <th className="py-3 px-6 text-left">آیدی استان</th>
      <th className="py-3 px-6 text-center">وضعیت</th>
      <th className="py-3 px-6 text-center">عملیات</th>
    </tr>
  </thead>
  <tbody className="text-gray-700 dark:text-white">
    {data.map((province) => (
      <tr
        key={province.id}
        className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
      >
        <td className="py-3 px-6 text-left">{province.name}</td>
        <td className="py-3 px-6 text-left">{province.id}</td>
        <td className="py-3 px-6 text-center">
          <input
            type="checkbox"
            defaultChecked={province.status}
            className="w-5 h-5 text-purple-600 focus:ring-purple-500 rounded"
          />
        </td>
        <td className="py-3 px-6 text-center">
          <button
            onClick={() => handleDelete(province.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash size={20} />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

        </div>
      </div>
      {isModalOpen && (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-sm mx-4">
      <h3 className="text-xl text-center mb-4 text-gray-900 dark:text-white">افزودن استان جدید</h3>
      <Formik
        initialValues={{ name: "", id: 0 }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors }) => (
          <Form>
            <div className="mb-4">
              <label
                htmlFor="provinceName"
                className="block text-gray-700 dark:text-gray-300"
              >
                نام استان
              </label>
              <Field
                type="text"
                id="provinceName"
                name="name"
                className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
              />
              <ErrorMessage
                name="name"
                className="text-red-600 dark:text-red-400"
                component="div"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="provinceId"
                className="block text-gray-700 dark:text-gray-300"
              >
                آیدی استان
              </label>
              <Field
                type="number"
                id="provinceId"
                name="id"
                className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
              />
              <ErrorMessage
                name="id"
                className="text-red-600 dark:text-red-400"
                component="div"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={closeModal}
                className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600"
              >
                بستن
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                ارسال
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  </div>
)}


    </React.Fragment>
  );
};

export default Index;
