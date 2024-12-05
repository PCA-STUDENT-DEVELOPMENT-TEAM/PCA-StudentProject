import React from 'react'
import AuthenticatedLayoutAdmin from '@/Layouts/AuthenticatedLayoutBioAdmin'
import { Head, usePage } from "@inertiajs/react";

type Props = {}

function TravelOrder({ }: Props) {
    return (
        <AuthenticatedLayoutAdmin header={<h2>{usePage().component.split("/")[1]}</h2>}>Travel Order</AuthenticatedLayoutAdmin>
    )
}

export default TravelOrder