import HomeIcon from "@mui/icons-material/Home";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import { emphasize, styled } from "@mui/material/styles";
import { Button, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";

// import Button from "@mui/material/Button";
// import DashboardBox from "./components/dashboardBox";
// import { FaUserCircle } from "react-icons/fa";
// import { IoMdCart } from "react-icons/io";
// import { MdShoppingBag } from "react-icons/md";

import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { postData } from "../../../utils/api";
import {
  deleteProductRam,
  fetchProductRam,
  updateProductRam,
} from "./AddProductRamService/AddProductRamService";

const StyledBreadcumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const AddProductRam = () => {
  const [rams, setRams] = useState([]);
  const [newRam, setNewRam] = useState(""); // Giữ trữ giá trị RAM mới
  const [loading, setLoading] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // Modal cho Edit
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // Modal cho Delete
  const [ramIdToDelete, setRamIdToDelete] = useState(null); // Lưu trữ id của RAM cần xóa
  const [editingRam, setEditingRam] = useState(null); // Lưu trữ thông tin RAM đang chỉnh sửa

  useEffect(() => {
    getAllRams();
  }, []);

  const addRam = async () => {
    if (!newRam.trim()) {
      alert("Please enter a valid RAM value.");
      return;
    }

    const response = await postData("/seller/createRam", { ram: newRam });
    if (response.id) {
      setNewRam("");
      getAllRams();
    } else {
      alert("Failed to add RAM. Please try again.");
    }
  };

  const getAllRams = async () => {
    try {
      const sortedRams = await fetchProductRam();
      setRams(sortedRams);
      setLoading(false);
    } catch (error) {
      console.error("Không thể lấy dữ liệu RAM:", error);
      setRams([]);
      setLoading(false);
    }
  };

  const handleEditRam = (id) => {
    const ramToEdit = rams.find((ram) => ram.id === id);
    setEditingRam(ramToEdit); // Đặt giá trị RAM cần chỉnh sửa
    setIsEditModalVisible(true); // Mở Modal chỉnh sửa
  };

  // Hàm xử lý sự kiện Delete (Xóa RAM)
  const handleDeleteRam = (id) => {
    setRamIdToDelete(id); // Lưu id của RAM cần xóa vào trạng thái
    setIsDeleteModalVisible(true); // Mở Modal xác nhận xóa
  };

  // Hàm xác nhận xóa
  const confirmDelete = async () => {
    try {
      // Gọi API xóa RAM
      await deleteProductRam(ramIdToDelete);
      // Cập nhật lại danh sách RAM sau khi xóa
      setRams(rams.filter((ram) => ram.id !== ramIdToDelete));
      setIsDeleteModalVisible(false); // Đóng modal sau khi xóa thành công
      console.log("Xóa RAM thành công!");
    } catch (error) {
      console.error("Có lỗi khi xóa RAM:", error);
    }
  };

  // Hàm hủy xóa (đóng modal)
  const cancelDelete = () => {
    setIsDeleteModalVisible(false); // Đóng modal nếu người dùng chọn Cancel
  };

  // Hàm xử lý chỉnh sửa RAM
  const handleSaveEdit = async () => {
    try {
      // Gọi API cập nhật RAM
      await updateProductRam(editingRam);
      // Cập nhật lại danh sách RAM sau khi chỉnh sửa
      setRams(rams.map((ram) => (ram.id === editingRam.id ? editingRam : ram)));
      setIsEditModalVisible(false); // Đóng modal sau khi cập nhật thành công
      console.log("Cập nhật RAM thành công!");
    } catch (error) {
      console.error("Có lỗi khi cập nhật RAM:", error);
    }
  };

  console.log("rams", rams);

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Add Product Ram</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcumb
              component="a"
              href="#"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcumb label="Products" component="a" href="#" />

            <StyledBreadcumb label="Add Products RAMS" />
          </Breadcrumbs>
        </div>

        <form className="form">
          <div className="row">
            <div className="col-sm-12">
              <div className="card p-4">
                <div className="form-group">
                  <h6>PRODUCT RAM</h6>
                  <input
                    type="text"
                    value={newRam}
                    onChange={(e) => setNewRam(e.target.value)}
                    placeholder="Enter RAM size (e.g., 8GB)"
                  />
                </div>
                <Button className="btn-lg btn-blue btn-big" onClick={addRam}>
                  Add Ram
                </Button>
              </div>
            </div>
          </div>
        </form>

        <div className="row">
          <div className="col-sm-12">
            <div className="card p-4">
              <div className="table-responsive mt-3">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <table className="table table-bordered v-align table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th style={{ width: "75%" }}>PRODUCT RAM</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>

                    <tbody>
                      {rams.length > 0 ? (
                        rams.map((ram, index) => (
                          <tr key={index}>
                            <td>{ram.ram}</td>
                            <td>
                              <div className="actions d-flex align-items-center">
                                <Button
                                  className="success"
                                  color="success"
                                  onClick={() => handleEditRam(ram.id)}>
                                  <FaPencilAlt />
                                </Button>
                                <Button
                                  className="error"
                                  color="error"
                                  onClick={() => handleDeleteRam(ram.id)}>
                                  <MdDelete />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="2" className="text-center">
                            No RAMs available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}

                {/* Modal xác nhận xóa */}
                <Modal
                  title="Xác nhận xóa RAM"
                  visible={isDeleteModalVisible}
                  onOk={confirmDelete} // Khi nhấn "OK", gọi confirmDelete
                  onCancel={cancelDelete}
                  okText="Xác nhận"
                  cancelText="Hủy">
                  <p>Bạn có chắc chắn muốn xóa RAM này không?</p>
                </Modal>

                {/* Modal chỉnh sửa RAM */}
                <Modal
                  title="Chỉnh sửa RAM"
                  visible={isEditModalVisible}
                  onOk={handleSaveEdit} // Khi nhấn "Save", gọi handleSaveEdit
                  onCancel={() => setIsEditModalVisible(false)} // Khi nhấn "Cancel", đóng modal
                  okText="Lưu"
                  cancelText="Hủy">
                  <div>
                    <label>RAM</label>
                    <Input
                      value={editingRam ? editingRam.ram : ""}
                      onChange={(e) =>
                        setEditingRam({ ...editingRam, ram: e.target.value })
                      } // Cập nhật giá trị khi chỉnh sửa
                    />
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProductRam;
