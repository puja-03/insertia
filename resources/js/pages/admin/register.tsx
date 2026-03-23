import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminAuthLayout from '@/layouts/admin/admin-auth-layout';
import { login } from '@/routes';
import { store } from '@/routes/register';

export default function AdminRegister() {
    return (
        <AdminAuthLayout title="Admin — Sign up" description="Create an admin account">
            <Head title="Admin Register" />

            <Form {...store.form()} className="flex flex-col gap-6">
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" required autoFocus placeholder="Full name" />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" name="email" required placeholder="email@example.com" />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" name="password" required placeholder="Password" />
                                <InputError message={errors.password} />
                            </div>

                            <Button type="submit" className="mt-2" disabled={processing}>
                                Sign up
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            Already have an account? <TextLink href={login()}>Log in</TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AdminAuthLayout>
    );
}
