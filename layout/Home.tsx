import { AppShell, Navbar, Header, Box, Anchor, Button } from '@mantine/core'
import Image from 'next/image'
import { useMe } from '../context/authContext'
import { UploadVideo } from '../components/UploadVideo'
import Link from 'next/link'
import { VideosContextProvider } from '../context/video'


export default function HomePageLayout({ children }: { children: React.ReactNode }) {
    const { user, refetch } = useMe()
    return (
        <VideosContextProvider>
            <AppShell
                padding='md'

                header={
                    <Header height={60} p='xs'>
                        <Box sx={() => ({ display: "flex" })}>
                            <Box sx={() => ({ flex: "1" })} >
                                <Image src="/logo.png" alt="logo" width={120} height={40} />
                              

                            </Box>
                            {!user && (
                                <>

                                    <Link href="/auth/login" passHref>
                                        <Button ml="lg" mr="lr">Login</Button>
                                      
                                    </Link>
                                    <Link href="/auth/register" passHref>
                                        <Button ml="lg" mr="lr">
                                            Register
                                        </Button>
                                       
                                    </Link>
                                </>

                            )}

                            {user && <>
                              
                                    <Button mr={20}>Log Out</Button>
                                    <UploadVideo/>

                            </>
                            }
                        </Box>
                    </Header>
                }

            >

                {children}
            </AppShell>
        </VideosContextProvider>
    )

}