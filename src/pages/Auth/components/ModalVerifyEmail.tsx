import { Button, Flex, Input } from 'antd';
import { verifyAPI } from 'apis/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { handleErrorAPI } from 'utils/helpers';

interface ModalVerifyEmailProps {
  email: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalVerifyEmail = ({ setOpen, email }: ModalVerifyEmailProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const handleVerifyEmail = async () => {
    try {
      if (!code?.trim()) {
        toast.error('Vui lòng nhập mã OTP!');
        return;
      }
      setLoading(true);
      const res: any = await verifyAPI({
        code,
        email,
      });
      if (res?.success) {
        toast.success(res?.message);
        setOpen(false);
        navigate('/login');
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      handleErrorAPI(error);
    }
  };
  return (
    <div>
      <h2 className="text-center mt-5">Nhập mã OTP đã được gửi tới email: {email}</h2>
      <Input className="mt-4" value={code} onChange={(e) => setCode(e.target?.value)} placeholder="Nhập mã xác minh" />
      <Flex className="w-full justify-center">
        <Button
          className="mt-4 mx-auto"
          loading={loading}
          disabled={loading}
          onClick={handleVerifyEmail}
          type="primary"
        >
          Xác minh
        </Button>
      </Flex>
    </div>
  );
};

export default ModalVerifyEmail;
