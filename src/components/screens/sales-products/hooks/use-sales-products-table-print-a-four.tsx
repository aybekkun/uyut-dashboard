import { PrinterOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { useReactToPrint } from "react-to-print"
import { SalesProduct } from "src/services/sales-products"
import { formatPhone, formatPriceUZS } from "src/utils/formatter.utils"

type Props = {
  record: SalesProduct
}

export const UseSalesProductsTablePrintAFour = ({ record }: Props) => {
  const componentRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  const handlePrint = useReactToPrint({
    contentRef: componentRef
  })

  return (
    <div>
      <div ref={componentRef} className="print-area">
        <div className="receipt">
          <p className="company-title">SHIFT</p>
          <div className="top">
            <h1 className="title">{t("receipt")} #{record.id}</h1>
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
          <table className="products">
            <thead>
              <tr>
                <th>{t("product")}</th>
                <th>{t("length")}</th>
                <th>{t("pieces")}</th>
                <th>{t("meter_square")}</th>
                <th>{t("print_meter_square")}</th>
                <th>{t("print_type")}</th>
                <th>{t("print_cost")}</th>
                <th>{t("material_cost")}</th>
                <th>{t("total_amount")}</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(record.products) &&
                record.products.map((item) => (
                  <tr key={item.id}>
                    <td>{item.product.name}</td>
                    <td>{Number(item.length) > 0 ? item.length : "-"}</td>
                    <td>{Number(item.pieces) > 0 ? item.pieces : "-"}</td>
                    <td>{Number(item.meter_square) > 0 ? item.meter_square : "-"}</td>
                    <td>{Number(item.print_meter_square) > 0 ? item.print_meter_square : "-"}</td>
                    <td>
                      {item.print_type
                        ? `${item.print_type.name} (${formatPriceUZS(item.print_type.amount)})`
                        : "-"}
                    </td>
                    <td>{Number(item.print_cost) > 0 ? formatPriceUZS(item.print_cost) : "-"}</td>
                    <td>{Number(item.material_cost) > 0 ? formatPriceUZS(item.material_cost) : "-"}</td>
                    <td>{Number(item.amount) > 0 ? formatPriceUZS(item.amount) : "-"}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="total">{t("total_cost")}: <b>{formatPriceUZS(record.total_cost)}</b></div>
        </div>
      </div>

      {/* Кнопка печати */}
      <Button icon={<PrinterOutlined />} onClick={handlePrint}>{t("print")}</Button>

      <style>
        {`
          /* скрываем блок на экране */
          .print-area {
            display: none;
          }
          /* показываем только при печати */
          @media print {
            @page {
              size: A4 portrait;
              margin: 20mm;
            }
            body * {
              visibility: hidden;
            }
            .print-area, .print-area * {
              visibility: visible;
            }
            .print-area {
              display: block;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
            }
          }
          .company-title {
            text-align: center;
            margin-bottom: 10px;
          }
          .receipt {
            font-family: monospace;
            font-size: 20px;
          }
          .receipt .title {
            text-align: center;
            padding-top: 30px;
            padding-bottom: 30px;
            border-top: 2px solid #000;
            border-bottom: 2px solid #000;
            margin-bottom: 100px;
          }
          p {
            margin: 0;
            padding: 0;
          }
          .top {
            margin-bottom: 80px;
          }
          .between {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0;
            border-bottom: 3px dotted #000;
            margin-bottom: 30px;
          }
          .products {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
            margin-top: 15px;
          }
          .products th, .products td {
            border: 1px solid #000;
            padding: 5px;
            text-align: center;
          }
          .total {
            text-align: right;
            font-size: 20px;
            margin-top: 100px;
            font-weight: bold;
          }
        `}
      </style>
    </div>
  )
}