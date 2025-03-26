"use client"
import React, {useEffect, useState} from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {createEmployeeService, findAllEmployeeService} from "@/services/employeeService";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {getAllEmployeeStatusesList} from "@/services/employeeStatusService";


function Page(props) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [status, setStatus] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [statuesList , setStatuesList] = useState([]);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        getEmployees();
        getEmployeeStatues()
    }, [])


    function getEmployeeStatues() {
        getAllEmployeeStatusesList().then((response) => {
            console.log(response.data);
            setStatuesList(response.data);
            return response.data;
        }).catch((error) => {
            console.log(error);
        })
    }


    function handleStatus(value) {
        setStatus(value);
        console.log(value);
    }

    function getEmployees() {
        findAllEmployeeService().then((response) => {
            console.log(response.data);
            setEmployees(response.data);
        })
    }


    function saveEmployee() {
        const saveEmployee = {firstName, lastName, age, phoneNumber, email, city, status};
        createEmployeeService(saveEmployee).then((response) => {
            console.log(response.data);
            alert(`employee saved successfully.`);
        }).catch((error) => {
            console.log(error);
        })
    }


    return (
        <div>

            {/*header area start*/}
            <div className="p-5 bg-green-900 text-center text-2xl text-white rounded-2xl">
                employee management
            </div>
            {/*header area end*/}


            {/*dialog form area start*/}
            <form>
                <div className="mt-10 gap-y-1.5">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="successBtn">Add Update Employees</Button>
                        </DialogTrigger>
                        <DialogContent className="w-full max-w-screen-lg sm:max-w-screen-lg">
                            <DialogHeader>
                                <DialogTitle>Add or update Employee</DialogTitle>
                                <DialogDescription>Make your changes</DialogDescription>
                            </DialogHeader>


                            <div className="w-full">
                                <Label className="mb-2"> First name</Label>
                                <Input type="text" name="firstName" placeholder="Enter First Name" value={firstName}
                                       onChange={(e) => setFirstName(e.target.value)}/>
                            </div>


                            <div className="w-full">
                                <Label className="mb-2"> Last name</Label>
                                <Input type="text" name="lastName" placeholder="Enter Last Name" value={lastName}
                                       onChange={(e) => setLastName(e.target.value)}/>
                            </div>


                            <div className="w-full">
                                <Label className="mb-2"> Age</Label>
                                <Input type="number" name="age" placeholder="Enter Age" value={age}
                                       onChange={(e) => setAge(e.target.value)}/>
                            </div>

                            <div className="w-full">
                                <Label className="mb-2"> Phone Number </Label>
                                <Input type="number" name="phoneNumber" placeholder="Enter Age" value={phoneNumber}
                                       onChange={(e) => setPhoneNumber(e.target.value)}/>
                            </div>

                            <div className="w-full">
                                <Label className="mb-2"> Email </Label>
                                <Input type="email" name="email" placeholder="Enter Age" value={email}
                                       onChange={(e) => setEmail(e.target.value)}/>
                            </div>


                            <div className="w-full">
                                <label className="mb-2">City</label>
                                <Input type="text" name="city" placeholder="Enter Age" value={city}
                                       onChange={(e) => setCity(e.target.value)}/>
                            </div>


                            <div className="w-full">
                                <label className="mb-2">Status</label>
                                <Select onValueChange={handleStatus}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Status"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Statues</SelectLabel>
                                            {statuesList.map((statusOne, index) =>
                                                <SelectItem key={index}
                                                            value={statusOne}>{statusOne.name}</SelectItem>
                                            )}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="w-full flex justify-between gap-4">
                                <Button variant="dangerBtn" type="submit">Reset</Button>
                                <Button variant="warningBtn" type="submit">Update</Button>
                                <Button variant="successBtn" type="submit" onClick={saveEmployee}>Save</Button>
                            </div>


                        </DialogContent>
                    </Dialog>
                </div>
            </form>
            {/*dialog form area end*/}

            {/*table area start*/}
            <div className="mt-10">
                <Table>
                    <TableCaption>All employee list</TableCaption>
                    <TableHeader className="bg-slate-600 text-white">
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>first name</TableHead>
                            <TableHead>last name</TableHead>
                            <TableHead>age</TableHead>
                            <TableHead>phone number</TableHead>
                            <TableHead>email</TableHead>
                            <TableHead>city</TableHead>
                            <TableHead>status</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees.map((oneEmployee, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{oneEmployee.firstName}</TableCell>
                                <TableCell>{oneEmployee.lastName}</TableCell>
                                <TableCell>{oneEmployee.age}</TableCell>
                                <TableCell>{oneEmployee.phoneNumber}</TableCell>
                                <TableCell>{oneEmployee.email}</TableCell>
                                <TableCell>{oneEmployee.city}</TableCell>
                                <TableCell>{oneEmployee.status.name}</TableCell>
                                <TableCell className="flex justify-between">
                                    <Button type="button" variant="secondary">Refill</Button>
                                    <Button type="button" variant="secondary">Delete</Button>
                                    <Button type="button" variant="secondary">Print</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {/*table area end*/}


        </div>
    );
}

export default Page;