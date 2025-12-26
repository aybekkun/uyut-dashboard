import { PrinterOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { useReactToPrint } from "react-to-print"
import { SalesProduct } from "src/services/sales-products"
import { formatPhone, formatPriceUZS } from "src/utils/formatter.utils"

import logo from "/logo.png"

type Props = {
  record: SalesProduct
}

export const UseSalesProductsTablePrint = ({ record }: Props) => {
  const componentRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  const handlePrint = useReactToPrint({
    contentRef: componentRef
  })

  return (
    <div>
      <div ref={componentRef} className="print-area">
        <div className="receipt">
          <div className="logo-title">
            <img className="logo" src={logo} alt="logo" />
          </div>
          <div className="top">
            <div className="between">
              <p><b>{t("client")}:</b></p>
              <p><b>{record.client.full_name}</b></p>
            </div>
            <div className="between">
              <p><b>{t("phone_number")}:</b></p>
              <p><b>{formatPhone(record.client.phone)}</b></p>
            </div>
            <div className="between">
              <p><b>{t("payment_method")}:</b></p>
              <p><b>{record.payment_type.name}</b></p>
            </div>
            <div className="between">
              <p><b>{t("date")}:</b></p>
              <p><b>{new Date(record.created_at).toLocaleString()}</b></p>
            </div>
          </div>

          <hr />

          {Array.isArray(record.products) &&
            record.products.map((item) => (
              <div key={item.id} className="product">
                {item.product.measurement_unit.id === 1 && (
                  <div className="between">
                    <p>{t("product")}:</p>
                    <p>{item.product.name} x {item.length} м = {item.meter_square} м²</p>
                  </div>
                )}
                {item.product.measurement_unit.id === 2 && (
                  <div className="between">
                    <p>{t("product")}:</p>
                    <p>{item.product.name} x {item.length} м</p>
                  </div>
                )}
                {item.product.measurement_unit.id === 3 && (
                  <div className="between">
                    <p>{t("product")}:</p>
                    <p>{item.product.name} x {item.pieces} {t("pieces")}</p>
                  </div>
                )}
                {Number(item.print_meter_square) > 0 && item.print_type && (
                  <div className="between">
                    <p>{item.print_type.name} x {item.print_meter_square} м²</p>
                    <p>{formatPriceUZS(item.print_cost)}</p>
                  </div>
                )}
                <div className="between">
                  <p>{t("material_cost")}</p>
                  <p>{formatPriceUZS(item.material_cost)}</p>
                </div>
                {Number(item.amount) > 0 && (
                  <div className="between">
                    <p>{t("total_amount")}</p>
                    <p>{formatPriceUZS(item.amount)}</p>
                  </div>
                )}
                <hr />
              </div>
            ))}

          <div className="total">{t("total_cost")}: <b>{formatPriceUZS(record.total_cost)}</b></div>
        </div>
      </div>

      <Button icon={<PrinterOutlined />} onClick={handlePrint}>{t("print")}</Button>

      <style>
        {`
          .print-area {
            display: none;
          }
          @media print {
            body * {
              visibility: hidden;
            
            }
            body {
              display: flex;
              justify-content: center;
            }
            .print-area, .print-area * {
              visibility: visible;
              
            }
            .print-area {
              display: block;
              width: 80mm; /* ширина рулона */
              font-family: monospace;
              font-size: 12px;
              padding: 5px;
            }
          }
          .logo-title {
            margin-top: 30px;
            margin-bottom: 50px;
            display: flex;
            gap: 5px;
            justify-content: center;
            align-items: center;
          }
          .logo {
            width: 80px;
            heigth: 80px;
            border-radius: 50%;
          }
          .between {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 5px;
          }
          hr {
            border: none;
            border-top: 1px dashed #000;
            margin: 5px 0;
          }
          .product p {
            margin: 2px 0;
          }
          .total {
            text-align: right;
            font-weight: bold;
            margin-top: 5px;
          }
        `}
      </style>
    </div>
  )
}
