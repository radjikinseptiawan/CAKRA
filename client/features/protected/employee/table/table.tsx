"use client";
import { allAccountsUsers } from "@/services/accounts.service";
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
    role: string;
    email: string;
  };
  username: string;
};

export default function TableEmployee() {
  const [users, setUsers] = useState<EmployeeType[]>([]);

  const getAllUsers = async () => {
    const response = await allAccountsUsers();
    if (!response) return null;
    const result = response.data;
    setUsers(result);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  if (!users) return null;

  return (
    <TableContainer>
      <Table component={Paper} sx={{ width: "100%" }} className="w-full mx-5">
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
            console.log(item);
            return (
              <TableRow key={index}>
                <TableCell>{item.Profile.fullname}</TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.Profile.email}</TableCell>
                <TableCell>{item.Profile.role}</TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Button color="error">
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
