import React, { useState } from 'react'
import useStateContext from '../customhooks/useStateContext'
import { Navigate, Outlet } from 'react-router-dom'

export default function Authenticate() {
const { context } = useStateContext()

    return (
        context.userId === 0? <Navigate to="/" /> : <Outlet />
    )
}

