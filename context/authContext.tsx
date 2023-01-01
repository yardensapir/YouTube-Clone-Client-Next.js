import { Loader } from "@mantine/core";
import { createContext, ReactNode, useContext } from "react";
import { useQuery,RefetchOptions, RefetchQueryFilters } from "react-query";
import { getMe } from "../pages/api";
import {Me ,QueryKeys } from "../types";

const AuthContext = createContext<{
    user: Me;
    refetch:  <TPageData>(
      options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => any;
    // @ts-ignore
  }>(null);


 function AuthContextProvider({children}:{children: ReactNode}){
    const{data,isLoading,refetch}= useQuery(QueryKeys.me, getMe)

    return (
        <AuthContext.Provider value={{user: data, refetch}}>
            {isLoading? <Loader/> : children}
        </AuthContext.Provider>
    )
 
}

const useMe =()=> useContext(AuthContext)

export{AuthContextProvider,useMe}