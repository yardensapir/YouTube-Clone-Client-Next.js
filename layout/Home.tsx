import { AppShell, Navbar, Header, Box } from '@mantine/core'
import Image from 'next/image'

export default function HomePageLayout({ children }: { children: React.ReactNode }) {

    return (
        <AppShell
            padding='md'
            navbar={
                <Navbar width={{ base: 300 }} height={500} p='xs'>
                    <h3>Side Items</h3>
                </Navbar>

            }
            header={
                <Header height={60} p='xs'>
                    <Box>
                        <Box >
                            <Image src="/logo1.png" alt="logo" width={40} height={40} />
                        </Box>
                    </Box>
                </Header>
            }

        >
            {children}
        </AppShell>
    )

}