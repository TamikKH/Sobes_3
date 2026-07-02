import api from "../api";
import { Ticket } from "../types";

interface Props {
    tickets: Ticket[];
    reload: () => void;
}

export default function TicketList({ tickets, reload }: Props) {

    async function changeStatus(id: number, status: string) {
        try {
            await api.patch(`/tickets/${id}/status`, {
                status
            });

            reload();
        } catch (e: any) {
            alert(
                e.response?.data?.detail ??
                "Ошибка изменения статуса"
            );
        }
    }

    async function remove(id: number) {

        if (!confirm("Удалить заявку?")) return;

        try {

            await api.delete(`/tickets/${id}`);

            reload();

        } catch (e: any) {

            alert(
                e.response?.data?.detail ??
                "Ошибка удаления"
            );

        }

    }

    return (

        <table border={1} cellPadding={8}>

            <thead>

            <tr>

                <th>ID</th>

                <th>Название</th>

                <th>Описание</th>

                <th>Приоритет</th>

                <th>Статус</th>

                <th>Создана</th>

                <th>Действия</th>

            </tr>

            </thead>

            <tbody>

            {tickets.map(ticket => (

                <tr key={ticket.id}>

                    <td>{ticket.id}</td>

                    <td>{ticket.title}</td>

                    <td>{ticket.description}</td>

                    <td>{ticket.priority}</td>

                    <td>

                        <select
                            value={ticket.status}
                            onChange={(e) =>
                                changeStatus(
                                    ticket.id,
                                    e.target.value
                                )
                            }
                        >

                            <option value="new">
                                New
                            </option>

                            <option value="in_progress">
                                In Progress
                            </option>

                            <option value="done">
                                Done
                            </option>

                        </select>

                    </td>

                    <td>

                        {new Date(
                            ticket.created_at
                        ).toLocaleString()}

                    </td>

                    <td>

                        <button
                            onClick={() => remove(ticket.id)}
                        >
                            Удалить
                        </button>

                    </td>

                </tr>

            ))}

            </tbody>

        </table>

    );

}