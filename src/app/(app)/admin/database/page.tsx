
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Database, Link as LinkIcon } from 'lucide-react';
import { ScrollAnimator } from '@/components/scroll-animator';
import { supabase } from '@/lib/supabase';

export default function AdminDatabasePage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKeyIsSet = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const handleTestConnection = async (e: React.FormEvent) => {
        e.preventDefault();

        if (supabaseUrl === 'https://placeholder.supabase.co' || !supabaseUrl || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            toast({
                variant: 'destructive',
                title: 'Missing Credentials',
                description: 'Please add your real Supabase URL and Key to the .env file before testing.',
            });
            return;
        }

        setIsLoading(true);
        toast({
            title: 'Testing Connection...',
            description: 'Attempting to establish a connection with your configured Supabase instance.',
        });

        try {
            // Test connection by trying to list storage buckets.
            const { error } = await supabase.storage.listBuckets();

            if (error) {
                throw error;
            }

            toast({
                title: 'Connection Successful!',
                description: 'Successfully connected to your Supabase instance.',
            });
        } catch (error: any) {
            console.error("Supabase connection error:", error);
            toast({
                variant: 'destructive',
                title: 'Connection Failed',
                description: error.message || 'An unknown error occurred. Check your .env file and console.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <ScrollAnimator>
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Database className="h-8 w-8 text-accent" />
                        <h1 className="text-3xl font-headline font-bold text-foreground">Database Configuration</h1>
                    </div>
                    <p className="text-muted-foreground">
                        Connect the platform to your external Supabase database using environment variables.
                    </p>
                </div>
            </ScrollAnimator>

            <ScrollAnimator>
                <Card>
                    <CardHeader>
                        <CardTitle>Supabase Connection</CardTitle>
                        <CardDescription>
                            To permanently connect your database, add your Supabase project URL and public anon key to the <code className="font-mono bg-muted p-1 rounded-sm">.env</code> file in the root of this project.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleTestConnection} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="supabaseUrl">NEXT_PUBLIC_SUPABASE_URL</Label>
                                <Input
                                    id="supabaseUrl"
                                    type="text"
                                    value={supabaseUrl || 'Not set in .env file'}
                                    readOnly
                                    disabled
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="supabaseKey">NEXT_PUBLIC_SUPABASE_ANON_KEY</Label>
                                <Input
                                    id="supabaseKey"
                                    type="text"
                                    value={supabaseKeyIsSet ? '************ (Set securely)' : 'Not set in .env file'}
                                    readOnly
                                    disabled
                                />
                                 <p className="text-xs text-muted-foreground">
                                    After updating your <code className="font-mono">.env</code> file, you may need to restart the application.
                                </p>
                            </div>
                            <Button type="submit" disabled={isLoading} className="w-full">
                                <LinkIcon className="mr-2 h-4 w-4" />
                                {isLoading ? 'Testing...' : 'Test Connection'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </ScrollAnimator>
        </div>
    );
}
