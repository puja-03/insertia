import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminAuthLayout from '@/layouts/admin/admin-auth-layout';
import { request } from '@/routes/password';

export default function AdminForgotPassword() {
    return (
        <AdminAuthLayout title="Admin — Forgot password" description="Enter your email to receive a password reset link">
            <Head title="Admin Forgot Password" />

            <Form {...request.form()} className="flex flex-col gap-6">
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input id="email" type="email" name="email" required placeholder="email@example.com" />
                                <InputError message={errors.email} />
                            </div>

                            <Button type="submit" className="mt-2" disabled={processing}>
                                Send reset link
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </AdminAuthLayout>
    );
}
