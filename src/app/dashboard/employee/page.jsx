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
import {findAllEmployeeService} from "@/services/employeeService";
import { Table,TableBody,TableCaption,TableCell,TableFooter,TableHead, TableHeader, TableRow,} from "@/components/ui/table"



function Page(props) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [status, setStatus] = useState([]);
    const [employees, setEmployees] = useState([]);


    useEffect(() => {
      getEmployees();
    },[])



    const statuesList = [
        {id:1,name:'active'},
        {id:1,name:'inactive'},
    ];


    function handleStatus(value){
        setStatus(value);
        console.log(value);
    }

    function getEmployees(){
        findAllEmployeeService().then((response)=>{
            console.log(response.data);
            setEmployees(response.data);
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
            <div className="mt-10 gap-y-1.5">
                <Dialog className="">
                    <DialogTrigger asChild>
                        <Button variant="successBtn">Add Update Employees</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add or update Employee</DialogTitle>
                            <DialogDescription>Make your changes</DialogDescription>
                        </DialogHeader>


                        <div className="w-full">
                            <Label> First name</Label>
                            <Input type="text" name="firstName" placeholder="Enter First Name" value={firstName}
                                   onChange={(e) => setFirstName(e.target.value)}/>
                        </div>


                        <div className="w-full">
                            <Label> Last name</Label>
                            <Input type="text" name="lastName" placeholder="Enter Last Name" value={lastName}
                                   onChange={(e) => setLastName(e.target.value)}/>
                        </div>


                        <div className="w-full">
                            <Label> Age</Label>
                            <Input type="number" name="age" placeholder="Enter Age" value={age}
                                   onChange={(e) => setAge(e.target.value)}/>
                        </div>

                        <div className="w-full">
                            <Label> Phone Number </Label>
                            <Input type="number" name="phoneNumber" placeholder="Enter Age" value={phoneNumber}
                                   onChange={(e) => setPhoneNumber(e.target.value)}/>
                        </div>

                        <div className="w-full">
                            <Label> Email </Label>
                            <Input type="email" name="email" placeholder="Enter Age" value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </div>


                        <div className="w-full">
                            <label>City</label>
                            <Input type="text" name="city" placeholder="Enter Age" value={city}
                                   onChange={(e) => setCity(e.target.value)}/>
                        </div>


                        <div className="w-full">
                            <label>Status</label>
                            <Select onValueChange={handleStatus}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Statues</SelectLabel>
                                        {statuesList.map((statusOne,index)=>
                                        <SelectItem key={index} value={statusOne.name}>{statusOne.name}</SelectItem>
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="w-full space-x-30">
                            <Button variant="dangerBtn" type="submit">Reset</Button>
                            <Button variant="warningBtn" type="submit">Update</Button>
                            <Button variant="successBtn" type="submit">Save</Button>
                        </div>



                    </DialogContent>
                </Dialog>
            </div>
            {/*dialog form area end*/}

            {/*table area start*/}
            <div className="mt-10">
                <Table>
                    <TableCaption>All employee list</TableCaption>
                    <TableHeader className="bg-slate-300 text-white">
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>first name</TableHead>
                                <TableHead>last name</TableHead>
                                <TableHead>age</TableHead>
                                <TableHead>phone number</TableHead>
                                <TableHead>email</TableHead>
                                <TableHead>city</TableHead>
                                <TableHead>status</TableHead>
                            </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees.map((oneEmployee,index)=>(
                            <TableRow key={index}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{oneEmployee.firstName}</TableCell>
                                <TableCell>{oneEmployee.lastName}</TableCell>
                                <TableCell>{oneEmployee.age}</TableCell>
                                <TableCell>{oneEmployee.phoneNumber}</TableCell>
                                <TableCell>{oneEmployee.email}</TableCell>
                                <TableCell>{oneEmployee.city}</TableCell>
                                <TableCell>{oneEmployee.status.name}</TableCell>
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