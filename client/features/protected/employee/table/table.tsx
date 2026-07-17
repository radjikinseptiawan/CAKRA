"use client";
import { useTokenJWT } from "@/context/user.context";
import {
  allAccountsUsers,
  updateRoleService,
} from "@/services/accounts.service";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";

type EmployeeType = {
  Profile: {
    fullname: string;
    number_phone: string;
    role: string;
    email: string;
  };
  username: string;
  account_id: string;
};

export default function TableEmployee() {
  const [users, setUsers] = useState<EmployeeType[]>([]);
  const user = useTokenJWT();

  const getAllUsers = async () => {
    const response = await allAccountsUsers();
    if (!response) return null;
    const result = response.data;
    console.log(result);
    setUsers(result);
  };
  const updateRole = async (username: string, role: string, id: string) => {
    setUsers((prev) =>
      prev.map((item) =>
        item.username === username
          ? {
              ...item,
              Profile: {
                ...item.Profile,
                role,
              },
            }
          : item,
      ),
    );
    await updateRoleService({ role: role }, id);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  if (!users) return null;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }} className="w-full mx-5">
        <TableHead>
          <TableRow>
            <TableCell>Nama Lengkap</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Nomor Telepon</TableCell>
            <TableCell>Aksi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{item.Profile.fullname}</TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.Profile.email}</TableCell>
                <TableCell>
                  {user && user.role === "OWNER" ? (
                    <select
                      className="px-2 py-3"
                      onChange={(e) =>
                        updateRole(
                          item.username,
                          e.target.value,
                          item.account_id,
                        )
                      }
                      value={item.Profile.role}
                    >
                      <option value="OWNER">Owner</option>
                      <option value="STAFF">Staff</option>
                      <option value="VISITOR">Visitor</option>
                    </select>
                  ) : (
                    <p>{item.Profile.role}</p>
                  )}
                </TableCell>
                <TableCell>{item.Profile.number_phone}</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    disabled={
                      (user && user?.role == "VISITOR") || user?.role == "STAFF"
                        ? true
                        : false
                    }
                  >
                    <Trash size={18} className="mx-2" />
                    Hapus
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
