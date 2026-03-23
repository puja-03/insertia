import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminAuthLayout from '@/layouts/admin/admin-auth-layout';
import { update } from '@/routes/password';

type Props = {
    token: string;
};

export default function AdminResetPassword({ token }: Props) {
    return (
        <AdminAuthLayout title="Admin — Reset password" description="Set a new password for your account">
            <Head title="Admin Reset Password" />

            <Form {...update.form()} className="flex flex-col gap-6">
                {({ processing, errors }) => (
                    <>
                        <input type="hidden" name="token" value={token} />

                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input id="email" type="email" name="email" required placeholder="email@example.com" />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" name="password" required placeholder="Password" />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">Confirm Password</Label>
                                <Input id="password_confirmation" type="password" name="password_confirmation" required placeholder="Confirm password" />
                            </div>

                            <Button type="submit" className="mt-2" disabled={processing}>
                                Reset password
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </AdminAuthLayout>
    );
}
