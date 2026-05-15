'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { APP_NAME } from '@/constants';

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Link href="/" className="flex items-center gap-2.5 mb-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-xl">{APP_NAME}</span>
        </Link>

        {!submitted ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-black text-white mb-2">Reset your password</h1>
              <p className="text-slate-400">Enter your email address and we'll send you a reset link.</p>
            </div>

            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <div className="space-y-2">
                <Label className="text-slate-300 text-sm font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    type="email"
                    placeholder="you@club.com"
                    required
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-red-500/50 h-11"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white h-11 font-semibold shadow-lg shadow-red-900/30 group">
                Send Reset Link
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Check your email</h2>
            <p className="text-slate-400 mb-8">
              We've sent a password reset link to your email address. The link expires in 1 hour.
            </p>
            <Button variant="outline" className="border-white/10 text-slate-300 hover:text-white hover:bg-white/5" onClick={() => setSubmitted(false)}>
              Try another email
            </Button>
          </motion.div>
        )}

        <div className="mt-8 text-center">
          <Link href="/(auth)/login" className="flex items-center justify-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
