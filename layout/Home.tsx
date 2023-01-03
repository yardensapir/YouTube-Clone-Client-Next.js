import { AppShell, Navbar, Header, Box, Anchor } from '@mantine/core'
import Image from 'next/image'
import { useMe } from '../context/authContext'
import { UploadVideo } from '../components/UploadVideo'
import Link from 'next/link'


export default function HomePageLayout({ children }: { children: React.ReactNode }) {
    const { user, refetch } = useMe()
    return (
        <AppShell
            padding='md'
            navbar={
                <Navbar width={{ base: 300 }} height={500} p='xs'>
                    <h3>Side Items</h3>
                </Navbar>
            }
            header={
                <Header  height={110} p='xs'>
                    <Box sx={() => ({ display: "flex" })}>
                        <Box sx={() => ({ flex: "1"})} >
                                <Image src="/logo1.png" alt="logo" width={40} height={40} />
                                <h3>YouTube</h3>
                        </Box>
                        {!user && (
                            <>

                                <Link href="/auth/login" passHref>
                                    <Anchor ml="lg" mr="lr">
                                        Login
                                    </Anchor>
                                </Link>
                                <Link href="/auth/register" passHref>
                                    <Anchor ml="lg" mr="lr">
                                        Register
                                    </Anchor>
                                </Link>
                            </>

                        )}

                        {user && <UploadVideo />}
                    </Box>
                </Header>
            }

        >
            {children}
        </AppShell>
    )

}