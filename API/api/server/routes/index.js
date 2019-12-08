import KeyToken from './keyToken'

import rolRoutes from './RolRoutes'
import userRoutes from './UserRoutes'
import branchRoutes from './BranchRoutes'
import companyRoutes from './CompanyRoutes'
import moduleRoutes from './ModuleRoutes'
import taskRoutes from './TaskRoutes'
import messageRoutes from './MessageRoutes'

import articlesRoutes from './ArticleRoutes'
import marksRoutes from './MarkRoutes'
import typesRoutes from './TypeRoutes'
import categoriesRoutes from './CategoryRoutes'

import cajasRoutes from './CajaRoutes'
import clientsRoutes from './ClientRoutes'

import salesRoutes from './SaleRoutes'
import reportsRoutes from './ReportRoutes'


export default (app) =>{	
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/rols',KeyToken, rolRoutes);
app.use('/api/v1/branchs',KeyToken, branchRoutes);
app.use('/api/v1/company',KeyToken, companyRoutes);
app.use('/api/v1/modules',KeyToken, moduleRoutes);
app.use('/api/v1/tasks',KeyToken, taskRoutes);
app.use('/api/v1/messages',KeyToken, messageRoutes);
app.use('/api/v1/articles', KeyToken, articlesRoutes);
app.use('/api/v1/marks', KeyToken, marksRoutes);
app.use('/api/v1/categories', KeyToken, categoriesRoutes);
app.use('/api/v1/types', KeyToken, typesRoutes);

app.use('/api/v1/cajas', KeyToken, cajasRoutes);
app.use('/api/v1/clients', KeyToken, clientsRoutes);
app.use('/api/v1/sales', KeyToken, salesRoutes);
app.use('/api/v1/reports', KeyToken, reportsRoutes);

}