import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Form, Button, Table, Row, Col, Card
} from 'react-bootstrap';


const EditMenu = () => {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [menuList, setMenuList] = useState([]);
  const [editData, setEditData] = useState(null);

  // Fetch packages from backend
  useEffect(() => {
    axios.get('http://localhost:8000/api/package')
      .then(res => setPackages(res.data))
      .catch(err => console.error(err));
  }, []);

  // Fetch menus when package selected
  useEffect(() => {
    if (selectedPackage) {
      axios.get(`http://localhost:8000/api/menu/${selectedPackage}`)
        .then(res => setMenuList(res.data))
        .catch(err => console.error(err));
    }
  }, [selectedPackage]);

  const handleEdit = (menu) => setEditData({ ...menu });

  const handleDelete = async (menuId) => {
    try {
      await axios.delete(`http://localhost:8000/api/menu/${menuId}`);
      setMenuList(menuList.filter((menu) => menu.menuId !== menuId));
      setEditData(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('menu_name', editData.name);
      formData.append('menu_type', editData.type);
      formData.append('detail_menu', editData.detail);
      formData.append('packageId', editData.packageType);
      if (editData.picture instanceof File) {
        formData.append('imageURL', editData.picture);
      }

      await axios.put(`http://localhost:8000/api/menu/${editData.menuId}`, formData);
      setEditData(null);

      const updatedMenus = await axios.get(`http://localhost:8000/api/menu/${selectedPackage}`);
      setMenuList(updatedMenus.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="py-5">
      <h3 className="fw-bold mb-5 text-center text-black" style={{textShadow: '3px 3px 1px rgba(0,0,0,0.2)',fontSize: '50px', letterSpacing: '6px'}}> EDIT MENU</h3>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Form.Group>
            <Form.Label className="fw-semibold">Pick Package</Form.Label>
            <Form.Select
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
              className="shadow-sm"
            >
              <option value="" disabled hidden>Select Your Package</option>
              {packages.map(pkg => (
                <option key={pkg.packageId} value={pkg.packageId}>
                  {pkg.package_type}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Card.Body>
      </Card>

      {selectedPackage && (
        <>
          <Table striped bordered hover responsive className="shadow-sm">
            <thead className="table-success">
              <tr>
                <th>Menu Name</th>
                <th>Type</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {menuList.map((menu) => (
                <tr key={menu.menuId}>
                  <td>{menu.menu_name}</td>
                  <td>{menu.menu_type}</td>
                  <td className="text-center">
                    <Button
                      variant="outline-success"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit({
                        menuId: menu.menuId,
                        name: menu.menu_name,
                        type: menu.menu_type,
                        detail: menu.detail_menu,
                        packageType: menu.packageId,
                        picture: menu.imageURL
                      })}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(menu.menuId)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {editData && (
            <Row className="justify-content-center mt-5">
              <Col md={8}>
                <Card className="shadow-lg border-0">
                  <Card.Body>
                    <h5 className="fw-bold text-success mb-3 text-center">Edit Menu Detail</h5>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Menu Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={editData.name}
                          onChange={(e) =>
                            setEditData({ ...editData, name: e.target.value })
                          }
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Menu Type</Form.Label>
                        <Form.Select
                          value={editData.type}
                          onChange={(e) =>
                            setEditData({ ...editData, type: e.target.value })
                          }
                        >
                          <option>Breakfast</option>
                          <option>Lunch</option>
                          <option>Dinner</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Detail Menu</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={editData.detail}
                          onChange={(e) =>
                            setEditData({ ...editData, detail: e.target.value })
                          }
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Package Type</Form.Label>
                        <Form.Select
                          value={editData.packageType}
                          onChange={(e) =>
                            setEditData({ ...editData, packageType: e.target.value })
                          }
                        >
                          {packages.map(pkg => (
                            <option key={pkg.packageId} value={pkg.packageId}>
                              {pkg.package_type}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>Picture</Form.Label>
                        <Form.Control
                          type="file"
                          onChange={(e) =>
                            setEditData({ ...editData, picture: e.target.files[0] })
                          }
                        />
                      </Form.Group>

                      <div className="d-flex justify-content-center gap-3 mt-4">
                        <Button
                         style={{ backgroundColor: '#CADCB5', border: 'none', color: '#000' }}
                         className="px-4 fw-semibold"
                         onClick={handleSave}
                        >
                          Save
                        </Button>
                        <Button
                         style={{ backgroundColor: '#CADCB5', border: 'none', color: '#000' }}
                         className="px-4 fw-semibold"
                         onClick={() => setEditData(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export default EditMenu;