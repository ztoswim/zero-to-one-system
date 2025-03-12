// src/pages/InvoicePage.tsx

import { useState } from 'react';
import InvoiceForm from '../components/InvoiceForm';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const InvoicePage = () => {
  const [open, setOpen] = useState(false);  // 控制弹窗的显示与隐藏

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">创建发票</h1>

      {/* 按钮触发弹窗 */}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        创建新的发票
      </Button>

      {/* 弹窗（Modal） */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>创建发票</DialogTitle>
        <DialogContent>
          {/* 弹出表单 */}
          <InvoiceForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            取消
          </Button>
          <Button onClick={handleClose} color="primary">
            提交
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InvoicePage;
