import { type } from "os";
import React, { createContext, useContext } from "react";

interface DateContext {
    date: number
}

const DateContext = createContext<DateContext | null>(null);
const { Provider } = DateContext;



const DateProvider = 
