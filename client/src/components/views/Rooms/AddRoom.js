import React, {useEffect, useState} from 'react';
import Icon from '@material-ui/core/Icon';
import axios from "axios";
import {Button, Chip, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import * as yup from "yup";
import {useFormik,Field} from "formik";
import styled from "styled-components";

const SubmitButton = styled.button`
  width: 120px;
  height: 40px;
  margin-left: 1rem;;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 15px;
  letter-spacing: 1.5px;
  font-weight: 500;
  color: #ffffff;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  text-align: center;

  &:hover {
    background-color: #5a2360;
    box-shadow: 0px 4px 12px rgba(72, 28, 76, 0.4);
    color: #fff;
    transform: translateY(-2px);
  }
`;

const facilitiesSet = ['TV','Ensuite Bathroom','Balcony','Mini fridge','WiFi'];

export const AddRoom = () => {

    const [room,setRoom] = useState([]);

    const validationSchema = yup.object({
        name: yup
            .string('Enter room name')
            .required('Name is required'),
        type: yup
            .string('Select room type')
            .required('Type is required'),
        space: yup
            .string('Enter space of the room')
            .required('Space is required'),
        guests: yup
            .string('Enter maximum guest count the room')
            .required('Guest count is required'),
        beds: yup
            .string('Enter bed count the room')
            .required('Bed count is required'),
        price: yup
            .string('Enter the price of the room')
            .required('Price is required'),
        description: yup
            .string('Enter the description')
            .required('Description is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            type: '',
            space: '',
            guests: '',
            beds: '',
            price: '',
            description: '',
            facilities: [],
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    useEffect(() => {},[])

    return (
        <div className={'content'}>
            <div className={'dashboard-header'}>
                Rooms & Suite Management
                <div className={'dashboard-subheader'}>
                    {/*TODO Align icon an route to go back*/}
                    <Icon style={{
                        color: '#5a2360',
                    }}>arrow_back_ios</Icon>
                    Add a Room
                </div>
            </div>
            <div className={'main-container'}>
                <div className={'form-container'}>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <InputLabel id="type">Type</InputLabel>
                        <Select
                            labelId="type"
                            id="type"
                            autoWidth
                            variant = 'outlined'
                            value={formik.values.type}
                            onChange={formik.handleChange}
                            error={formik.touched.type && Boolean(formik.errors.type)}
                            helperText={formik.touched.type && formik.errors.type}
                            style={{'marginTop': '10px'}}
                        >
                            <MenuItem value={1}>Room</MenuItem>
                            <MenuItem value={2}>Suite</MenuItem>
                        </Select>
                        <TextField
                            fullWidth
                            id="guests"
                            name="guests"
                            label="Guests"
                            type="number"
                            value={formik.values.guests}
                            onChange={formik.handleChange}
                            error={formik.touched.guests && Boolean(formik.errors.guests)}
                            helperText={formik.touched.guests && formik.errors.guests}
                        />
                        <TextField
                            fullWidth
                            id="beds"
                            name="beds"
                            label="Beds"
                            type="number"
                            value={formik.values.beds}
                            onChange={formik.handleChange}
                            error={formik.touched.beds && Boolean(formik.errors.beds)}
                            helperText={formik.touched.beds && formik.errors.beds}
                        />
                        <TextField
                            fullWidth
                            id="space"
                            name="space"
                            label="Space"
                            type="number"
                            value={formik.values.space}
                            onChange={formik.handleChange}
                            error={formik.touched.space && Boolean(formik.errors.space)}
                            helperText={formik.touched.space && formik.errors.space}
                        />
                        <TextField
                            fullWidth
                            id="price"
                            name="price"
                            label="Price per night/person"
                            type="number"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            error={formik.touched.price && Boolean(formik.errors.price)}
                            helperText={formik.touched.price && formik.errors.price}
                        />
                        <TextField
                            fullWidth
                            id="description"
                            name="description"
                            label="Description"
                            multiline
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                        <Autocomplete
                            multiple
                            id="facilities"
                            options={facilitiesSet}
                            defaultValue={[facilitiesSet[0]]}
                            freeSolo
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField {...params} variant="standard" label="Facilities"  />
                            )}
                            value={formik.values.facilities}
                            onChange={(e, value) => {
                                formik.setFieldValue(
                                    "facilities",
                                    value !== null ? value : formik.initialValues.facilities
                                );
                                console.log(formik.values.facilities);
                            }}
                            error={formik.touched.facilities && Boolean(formik.errors.facilities)}
                            helperText={formik.touched.facilities && formik.errors.facilities}
                        />
                        <SubmitButton
                                style={{
                                    float: 'right',
                                    marginTop: '10px',
                                    backgroundColor: '#5a2360',
                                    fontFamily: 'Josefin Sans'
                                }}
                                type = "submit"
                        >
                            Add Room
                        </SubmitButton>
                    </form>
                </div>
            </div>
        </div>
    );
};
