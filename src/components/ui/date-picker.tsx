import { CalendarFilled } from "@ant-design/icons"
import {
	ConfigProvider,
	DatePicker as AntdDatePicker,
	DatePickerProps as AntdDatePickerProps,
	Space
} from "antd"
import { PickerRef } from "rc-picker/es"
import { forwardRef } from "react"
import { Button } from "src/components/ui/button"

interface DatePickerProps extends AntdDatePickerProps {
	onToday?: () => void
}

const DatePicker = forwardRef<PickerRef, DatePickerProps>(
	({ onToday, style, ...rest }, ref) => {
		const datePicker = (
			<AntdDatePicker
				ref={ref}
				style={{ width: "100%", ...style }}
				format={{
					format: "DD.MM.YYYY",
					type: "mask"
				}}
				{...rest}
			/>
		)

		const datePickerWithToday = onToday ? (
			<Space.Compact style={{ width: "100%" }}>
				{datePicker}
				<Button
					tooltip={"Сегодня"}
					icon={<CalendarFilled />}
					onClick={onToday}
				/>
			</Space.Compact>
		) : (
			datePicker
		)

		return <ConfigProvider>{datePickerWithToday}</ConfigProvider>
	}
)
DatePicker.displayName = "DatePicker"

export { DatePicker }
